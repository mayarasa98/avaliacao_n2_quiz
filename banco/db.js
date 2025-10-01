import { openDatabaseAsync } from 'expo-sqlite';

let dbPromise = null;

async function getDb() {
  if (!dbPromise) dbPromise = openDatabaseAsync('quiz.db');
  return dbPromise;
}

function isSelect(sql) {
  return /^\s*select/i.test(sql);
}

export async function executarAsync(sql, params = []) {
  const db = await getDb();
  if (isSelect(sql)) {
    const rows = await db.getAllAsync(sql, params);
    return { rows: { _array: rows } };
  } else {
    const res = await db.runAsync(sql, params);
    return { rowsAffected: res.changes, insertId: res.lastInsertRowId };
  }
}

export async function executarTransacaoAsync(acoesFn) {
  const db = await getDb();
  await db.withTransactionAsync(async () => {
    const tx = {
      executeSql: async (sql, params = [], onSuccess, onError) => {
        try {
          if (isSelect(sql)) {
            const rows = await db.getAllAsync(sql, params);
            onSuccess && onSuccess(null, { rows: { _array: rows } });
          } else {
            const res = await db.runAsync(sql, params);
            onSuccess && onSuccess(null, {
              rowsAffected: res.changes,
              insertId: res.lastInsertRowId,
            });
          }
        } catch (e) {
          if (onError) {
            onError(null, e);
          } else {
            throw e;
          }
        }
      },
    };

    await acoesFn(tx);
  });
}
