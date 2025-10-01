import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { executarAsync, executarTransacaoAsync } from '../banco/db';
import AlternativaInput from '../componentes/alternativaInput';
import { comuns, perguntas as st, botao } from '../styles/styles';

export default function PerguntasTela({ route }) {
  const { tema } = route.params;
  const [pergunta, setPergunta] = useState('');
  const [lista, setLista] = useState([]);
  const [alternativas, setAlternativas] = useState([
    { texto: '', correta: false },
    { texto: '', correta: false },
    { texto: '', correta: false },
    { texto: '', correta: false },
  ]);

  async function carregar() {
    const res = await executarAsync('SELECT * FROM perguntas WHERE tema_id=? ORDER BY id DESC;', [tema.id]);
    const arr = res.rows._array || [];
    for (const p of arr) {
      const ops = await executarAsync('SELECT * FROM alternativas WHERE pergunta_id=? ORDER BY id;', [p.id]);
      p.alternativas = ops.rows._array || [];
    }
    setLista(arr);
  }

  function validar() {
    if (!pergunta.trim()) return 'Informe o texto da pergunta.';
    const preenchidas = alternativas.filter(a => a.texto.trim());
    if (preenchidas.length !== 4) return 'Preencha as 4 alternativas.';
    const corretas = alternativas.filter(a => a.correta);
    if (corretas.length !== 1) return 'Marque exatamente 1 alternativa correta.';
    return null;
    }

  async function salvar() {
    const erro = validar();
    if (erro) return Alert.alert('Atenção', erro);

    await executarTransacaoAsync(async (tx) => {
      const rPerg = await new Promise((resolve, reject) =>
        tx.executeSql(
          'INSERT INTO perguntas (tema_id, texto) VALUES (?, ?);',
          [tema.id, pergunta.trim()],
          (_, r) => resolve(r),
          (_, e) => { reject(e); return true; }
        )
      );

      const perguntaId = rPerg.insertId;
      for (const alt of alternativas) {
        await new Promise((resolve, reject) =>
          tx.executeSql(
            'INSERT INTO alternativas (pergunta_id, texto, correta) VALUES (?, ?, ?);',
            [perguntaId, alt.texto.trim(), alt.correta ? 1 : 0],
            (_, r) => resolve(r),
            (_, e) => { reject(e); return true; }
          )
        );
      }
    });

    setPergunta('');
    setAlternativas([
      { texto: '', correta: false },
      { texto: '', correta: false },
      { texto: '', correta: false },
      { texto: '', correta: false },
    ]);

    carregar();
  }

  async function remover(perguntaId) {
    await executarAsync('DELETE FROM alternativas WHERE pergunta_id=?;', [perguntaId]);
    await executarAsync('DELETE FROM perguntas WHERE id=?;', [perguntaId]);
    carregar();
  }

  useEffect(() => { carregar(); }, []);

  return (
    <KeyboardAvoidingView style={comuns.tela} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={[comuns.conteudo, { paddingBottom: 120 }]} keyboardShouldPersistTaps="handled">
        <Text style={st.tituloTema}>Tema: {tema.tema}</Text>

        <TextInput
          placeholder="Digite a pergunta"
          value={pergunta}
          onChangeText={setPergunta}
          style={comuns.input}
          autoCapitalize="sentences"
          autoCorrect={true}
        />

        {alternativas.map((alt, i) => (
          <AlternativaInput
            key={i}
            indice={i}
            valor={alt.texto}
            correta={alt.correta}
            aoAlterarTexto={(v) => {
              const novas = alternativas.slice();
              novas[i] = { ...novas[i], texto: v };
              setAlternativas(novas);
            }}
            aoAlternarCorreta={() => {
              const novas = alternativas.map((a, idx) => ({ ...a, correta: idx === i }));
              setAlternativas(novas);
            }}
          />
        ))}

        <Text style={comuns.subtitulo}>Perguntas cadastradas</Text>

        <FlatList
          data={lista}
          keyExtractor={(item) => String(item.id)}
          ItemSeparatorComponent={() => <View style={comuns.linha} />}
          renderItem={({ item }) => (
            <View style={comuns.card}>
              <Text style={{ fontWeight: '600' }}>{item.texto}</Text>
              {item.alternativas.map((a) => (
                <Text key={a.id} style={{ marginLeft: 8 }}>
                  {a.correta ? '✅ ' : '• '} {a.texto}
                </Text>
              ))}
              <View style={{ marginTop: 8 }}>
                <Button title="Excluir" color="#b00020" onPress={() => remover(item.id)} />
              </View>
            </View>
          )}
          scrollEnabled={false}
        />
      </ScrollView>

      <View style={comuns.rodapeAbsoluto}>
        <Button title="Salvar Perguntas" onPress={salvar} />
      </View>
    </KeyboardAvoidingView>
  );
}