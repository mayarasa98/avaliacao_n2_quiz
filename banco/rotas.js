import { executarAsync } from './db';

export async function criar() {
  await executarAsync(`
    CREATE TABLE IF NOT EXISTS temas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tema TEXT NOT NULL UNIQUE
    );
  `);

  await executarAsync(`
    CREATE TABLE IF NOT EXISTS perguntas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tema_id INTEGER NOT NULL,
      texto TEXT NOT NULL
    );
  `);

  await executarAsync(`
    CREATE TABLE IF NOT EXISTS alternativas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pergunta_id INTEGER NOT NULL,
      texto TEXT NOT NULL,
      correta INTEGER NOT NULL CHECK (correta IN (0,1))
    );
  `);
}