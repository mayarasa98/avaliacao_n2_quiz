import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaInicial from './telas/telaInicial';
import TemasTela from './telas/temasTela';
import PerguntasTela from './telas/perguntasTela';
import ConfigurarQuizTela from './telas/configurarQuizTela';
import JogarQuizTelaela from './telas/jogarQuizTela';
import ResumoQuizTela from './telas/resumoQuizTela';
import { criar } from './banco/rotas';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => { criar(); }, []); //Garante que as tabelas vão ser criadas no banco

  return (
    //Rotas de navegação
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={TelaInicial} options={{ headerShown: false }} />
        <Stack.Screen name="Temas" component={TemasTela} options={{ title: 'Temas' }} />
        <Stack.Screen name="Perguntas" component={PerguntasTela} options={{ title: 'Perguntas' }} />
        <Stack.Screen name="ConfigurarQuiz" component={ConfigurarQuizTela} options={{ title: 'Configurar Quiz' }} />
        <Stack.Screen name="JogarQuiz" component={JogarQuizTelaela} options={{ title: 'Quiz' }} />
        <Stack.Screen name="ResumoQuiz" component={ResumoQuizTela} options={{ title: 'Resumo' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
