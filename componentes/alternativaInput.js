import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { componenteAlternativa as st } from '../styles/styles';

export default function AlternativaInput({ valor, aoAlterarTexto, correta, aoAlternarCorreta, indice }) {
  return (
    <View style={st.container}>
      <Text style={st.titulo}>Alternativa {indice + 1}</Text>
      <TextInput
        placeholder="Texto da alternativa"
        value={valor}
        onChangeText={aoAlterarTexto}
        style={st.input}
        autoCapitalize="sentences"
        autoCorrect={true}
      />
      <TouchableOpacity
        onPress={aoAlternarCorreta}
        style={[st.correta, correta && st.corretaAtiva]}
      >
        <Text>{correta ? '✅ Correta' : 'Marcar como correta'}</Text>
      </TouchableOpacity>
    </View>
  );
}