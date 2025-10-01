import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import { executarAsync } from '../banco/db';
import { embaralhar } from '../utils/ajuda';
import { comuns, jogar as st } from '../styles/styles';

export default function JogarQuizTela({ route, navigation }) {
  const { temaId, qtd } = route.params;
  const [perguntas, setPerguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [selecionada, setSelecionada] = useState(null);
  const [respostas, setRespostas] = useState([]); // {questionId, optionId}

  async function carregar() {
    const qRes = await executarAsync('SELECT * FROM perguntas WHERE tema_id=?;', [temaId]);
    let qs = qRes.rows._array || [];
    qs = embaralhar(qs).slice(0, qtd);
    for (const q of qs) {
      const oRes = await executarAsync('SELECT * FROM alternativas WHERE pergunta_id=?;', [q.id]);
      q.alternativas = embaralhar(oRes.rows._array || []);
    }
    setPerguntas(qs);
  }

  function proxima() {
    if (selecionada == null) return Alert.alert('Atenção', 'Selecione uma alternativa.');
    const q = perguntas[indice];
    const atualizadas = respostas.concat([{ questionId: q.id, optionId: selecionada }]);
    setRespostas(atualizadas);
    setSelecionada(null);
    if (indice + 1 < perguntas.length) {
      setIndice(indice + 1);
    } else {
      navigation.replace('ResumoQuiz', { perguntas, respostas: atualizadas });
    }
  }

  useEffect(() => { carregar(); }, []);

  if (!perguntas.length) {
    return (
      <View style={[comuns.tela, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text>Carregando perguntas...</Text>
      </View>
    );
  }

  const q = perguntas[indice];
  return (
    <View style={comuns.tela}>
      <View style={comuns.conteudo}>
        <Text style={st.cabecalho}>Pergunta {indice + 1} de {perguntas.length}</Text>
        <Text style={st.pergunta}>{q.texto}</Text>

        {q.alternativas.map(op => (
          <TouchableOpacity
            key={op.id}
            onPress={() => setSelecionada(op.id)}
            style={[st.opcao, selecionada === op.id && st.opcaoSelecionada]}
          >
            <Text>{op.texto}</Text>
          </TouchableOpacity>
        ))}

        <Button
          title={indice + 1 < perguntas.length ? 'Próxima' : 'Finalizar'}
          onPress={proxima}
        />
      </View>
    </View>
  );
}
