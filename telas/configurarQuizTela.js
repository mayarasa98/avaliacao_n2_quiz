import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { executarAsync } from '../banco/db';
import { comuns, configurar as st } from '../styles/styles';

export default function ConfigurarQuizTela({ navigation }) {
  const [temas, setTemas] = useState([]);
  const [quantidades, setQuantidades] = useState({});
  const [temaId, setTemaId] = useState(null);
  const [qtd, setQtd] = useState('');

  async function carregarTemas() {
    const res = await executarAsync('SELECT * FROM temas ORDER BY tema;');
    const arr = res.rows._array || [];
    setTemas(arr);
    if (arr.length && !temaId) setTemaId(arr[0].id);

    const cont = {};
    for (const t of arr) {
      const r = await executarAsync('SELECT COUNT(*) as c FROM perguntas WHERE tema_id=?;', [t.id]);
      cont[t.id] = r.rows._array?.[0]?.c || 0;
    }
    setQuantidades(cont);
  }

  function iniciar() {
    const n = parseInt(qtd || '0', 10);
    if (!temaId) return Alert.alert('Atenção', 'Selecione um tema.');
    if (!Number.isFinite(n) || n <= 0) return Alert.alert('Atenção', 'Informe uma quantidade válida.');
    if ((quantidades[temaId] || 0) < n) return Alert.alert('Atenção', 'Esse tema não possui perguntas suficientes.');
    navigation.navigate('JogarQuiz', { temaId, qtd: n });
  }

  useEffect(() => { carregarTemas(); }, []);

  return (
    <View style={comuns.tela}>
      <View style={comuns.conteudo}>
        <Text style={comuns.titulo}>Configurar Quiz</Text>

        <Text>Tema (perguntas disponíveis):</Text>
        <View style={st.seletor}>
          <Picker selectedValue={temaId} onValueChange={setTemaId}>
            {temas.map(t => (
              <Picker.Item key={t.id} label={`${t.tema} (${quantidades[t.id] ?? 0})`} value={t.id} />
            ))}
          </Picker>
        </View>

        <Text>Quantidade de perguntas:</Text>
        <TextInput
          keyboardType="numeric"
          value={qtd}
          onChangeText={setQtd}
          style={comuns.input}
        />

        <Button title="Iniciar Quiz" onPress={iniciar} />

        <View style={{ marginTop: 16 }}>
          <Button title="Gerenciar Temas" onPress={() => navigation.navigate('Temas')} />
          <View style={comuns.linha} />
          <Button
            title="Gerenciar Perguntas"
            onPress={() => {
              if (!temaId) return Alert.alert('Atenção', 'Selecione um tema primeiro.');
              const tema = temas.find(t => t.id === temaId);
              navigation.navigate('Perguntas', { tema });
            }}
          />
        </View>
      </View>
    </View>
  );
}
