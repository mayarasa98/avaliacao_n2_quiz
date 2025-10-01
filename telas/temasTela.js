import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, TouchableOpacity } from 'react-native';
import { executarAsync } from '../banco/db';
import { comuns, temas as st } from '../styles/styles';

export default function TemasTela({ navigation }) {
    const [nome, setNome] = useState('');
    const [temas, setTemas] = useState([]);

    async function carregar() {
        const res = await executarAsync('SELECT * FROM temas ORDER BY tema;');
        setTemas(res.rows._array || []);
    }


    async function adicionar() {
        if (!nome.trim()) return Alert.alert('Atenção', 'Informe um tema.');
        try {
            await executarAsync('INSERT INTO temas (tema) VALUES (?);', [nome.trim()]);
            setNome('');
            carregar();
        } catch (e) {
            Alert.alert('Erro', 'Não foi possível salvar. ' + e.message);
        }
    }

    async function remover(id) {
        await executarAsync('DELETE FROM alternativas WHERE pergunta_id IN (SELECT id FROM perguntas WHERE tema_id=?);', [id]);
        await executarAsync('DELETE FROM perguntas WHERE tema_id=?;', [id]);
        await executarAsync('DELETE FROM temas WHERE id=?;', [id]);
        carregar();
    }

    useEffect(() => { carregar(); }, []);

    return (
        <View style={comuns.tela}>
            <View style={comuns.conteudo}>
                <Text style={comuns.titulo}>Temas</Text>

            <View style={st.linhaAdd}>
                <TextInput
                    placeholder="Novo tema"
                    value={nome}
                    onChangeText={setNome}
                    style={comuns.input}
                />
                <Button title="Adicionar" onPress={adicionar} />
            </View>

            <FlatList
                data={temas}
                keyExtractor={(item) => String(item.id)}
                ItemSeparatorComponent={() => <View style={comuns.linha} />}
                renderItem={({ item }) => (
                    <View style={st.item}>
                        <TouchableOpacity onPress={() => navigation.navigate('Perguntas', { tema: item })}>
                            <Text style={st.nomeTema}>{item.tema}</Text>
                            <Text style={st.dica}>Clique para adicionar perguntas</Text>
                        </TouchableOpacity>
                        <Button title="Excluir" color="#b00020" onPress={() => remover(item.id)} />
                    </View>
                )}
            />

            <Button title="Jogar" onPress={() => navigation.navigate('ConfigurarQuiz')} />
        </View>
    </View>
);
}