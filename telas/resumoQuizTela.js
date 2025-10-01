import React, { useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { comuns } from '../styles/styles';

export default function ResumoQuizTela({ route }) {
  const { perguntas, respostas } = route.params;

  const relatorio = useMemo(() => {
    let corretas = 0;
    const linhas = perguntas.map(q => {
      const marcada = respostas.find(a => a.questionId === q.id)?.optionId;
      const opcaoCorreta = q.alternativas.find(o => o.correta === 1);
      const opcaoMarcada = q.alternativas.find(o => o.id === marcada);
      const acertou = marcada && opcaoMarcada?.id === opcaoCorreta?.id;
      if (acertou) corretas++;
      return {
        id: q.id,
        texto: q.texto,
        textoMarcado: opcaoMarcada?.texto || '(não respondida)',
        textoCorreto: opcaoCorreta?.texto || '(?)',
        certa: !!acertou,
      };
    });
    const pct = perguntas.length ? Math.round((corretas / perguntas.length) * 100) : 0;
    return { linhas, corretas, total: perguntas.length, pct };
  }, [perguntas, respostas]);

  return (
    <View style={comuns.tela}>
      <View style={comuns.conteudo}>
        <Text style={comuns.titulo}>Resumo do Quiz</Text>
        <Text>Acertos: {relatorio.corretas}/{relatorio.total} — {relatorio.pct}%</Text>

        <FlatList
          data={relatorio.linhas}
          keyExtractor={(item) => String(item.id)}
          ItemSeparatorComponent={() => <View style={comuns.linha} />}
          renderItem={({ item }) => (
            <View style={comuns.card}>
              <Text style={{ fontWeight: '600' }}>{item.texto}</Text>
              <Text>Você marcou: {item.textoMarcado} {item.certa ? '✅' : '❌'}</Text>
              {!item.certa && <Text>Correta: {item.textoCorreto}</Text>}
            </View>
          )}
        />
      </View>
    </View>
  );
}
