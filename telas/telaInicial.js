import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { comuns, home as st } from '../styles/styles';

export default function TelaInicial({ navigation }) {
  const escala = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(escala, { toValue: 1.05, duration: 900, useNativeDriver: true }),
        Animated.timing(escala, { toValue: 1.00, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, [escala]);

  return (
    <View style={comuns.tela}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#0ea5e9', '#1e3a8a']} style={st.bg}>
        <View style={st.topo}>
          <Text style={st.emoji}>🧠</Text>
          <Text style={st.titulo}>Quiz</Text>
          <Text style={st.subtitulo}>Teste seus conhecimentos!</Text>
        </View>

        <Animated.View style={[st.wrapperBotao, { transform: [{ scale: escala }] }]}>
          <TouchableOpacity style={st.botaoJogar} onPress={() => navigation.navigate('ConfigurarQuiz')}>
            <Text style={st.botaoJogarTxt}>JOGAR AGORA</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={st.linhaAcoes}>
          <TouchableOpacity style={st.btnSecundario} onPress={() => navigation.navigate('Temas')}>
            <Text style={st.btnSecundarioTxt}>Temas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={st.btnSecundario} onPress={() => navigation.navigate('ConfigurarQuiz')}>
            <Text style={st.btnSecundarioTxt}>Configurar Quiz</Text>
          </TouchableOpacity>
        </View>

        <View style={st.rodape}>
          <Text style={st.rodapeTxt}>© {new Date().getFullYear()} - EC10 - Programação Mobile - N2</Text>
        </View>
      </LinearGradient>
    </View>
  );
}
