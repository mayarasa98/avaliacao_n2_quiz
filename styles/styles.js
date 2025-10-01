import { StyleSheet } from 'react-native';

export const cores = {
  fundo: '#f0f9ff',
  card: '#e0f2fe',
  prim: '#0ea5e9',
  primEscuro: '#1e3a8a',
  perigo: '#ef4444',
  texto: '#0f172a',
  textoSuave: '#334155',
};

export const comuns = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 16, gap: 12 },
  titulo: { fontSize: 22, fontWeight: '800', color: cores.primEscuro },
  subtitulo: { fontSize: 16, fontWeight: '600', color: cores.textoSuave },
  input: {
    borderWidth: 1,
    borderColor: cores.prim,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    color: cores.texto,
  },
  linha: { height: 10 },
  card: {
    backgroundColor: cores.card,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  rodapeAbsoluto: { position: 'absolute', left: 16, right: 16, bottom: 16 },
});

export const botao = StyleSheet.create({
  prim: {
    backgroundColor: cores.prim,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primTxt: { color: 'white', fontWeight: '800', fontSize: 16 },

  sec: {
    backgroundColor: '#fff',
    borderColor: cores.prim,
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  secTxt: { color: cores.prim, fontWeight: '700', fontSize: 14 },

  perigo: {
    backgroundColor: '#fee2e2',
    borderColor: cores.perigo,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  perigoTxt: { color: cores.perigo, fontWeight: '700' },
});

export const temas = StyleSheet.create({
  linhaAdd: { flexDirection: 'row', gap: 10 },
  item: {
    ...comuns.card, // reutiliza o card azul claro
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nomeTema: { color: cores.texto, fontSize: 16, fontWeight: '700' },
  dica: { color: cores.textoSuave, fontSize: 12, marginTop: 4 },
});

export const configurar = StyleSheet.create({
  seletor: {
    borderWidth: 1,
    borderColor: cores.prim,
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
});

export const perguntas = StyleSheet.create({
  tituloTema: { 
    fontSize: 18, 
    fontWeight: '800', 
    color: '#1e3a8a', 
    marginBottom: 4 },
  container: {
    backgroundColor: '#e0f2fe',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bae6fd',
    marginBottom: 10,
  },
});

//Tela inicial
export const home = StyleSheet.create({
  bg: { flex: 1, padding: 24, justifyContent: 'space-between' },
  topo: { marginTop: 40, alignItems: 'center' },
  emoji: { fontSize: 64, marginBottom: 10 },
  titulo: { color: '#fff', fontSize: 36, fontWeight: '800', letterSpacing: 1 },
  subtitulo: { color: 'rgba(255,255,255,0.9)', fontSize: 16, marginTop: 6 },
  wrapperBotao: { alignItems: 'center', marginTop: 10 },
  botaoJogar: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    minWidth: 240,
    alignItems: 'center',
  },
  botaoJogarTxt: { color: '#fff', fontSize: 18, fontWeight: '800' },
  linhaAcoes: { flexDirection: 'row', gap: 12, justifyContent: 'center' },
  btnSecundario: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  btnSecundarioTxt: { color: '#fff', fontSize: 14, fontWeight: '600' },
  rodape: { alignItems: 'center', marginBottom: 6 },
  rodapeTxt: { color: 'rgba(255,255,255,0.8)' },
});

export const componenteAlternativa = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderColor: '#bae6fd',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    gap: 8,
  },
  titulo: { fontWeight: '700', color: cores.texto },
  input: {
    borderWidth: 1,
    borderColor: cores.prim,
    backgroundColor: '#fff',
    color: cores.texto,
    padding: 10,
    borderRadius: 10,
  },
  corretaBtn: {
    borderWidth: 1,
    borderColor: cores.prim,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f8fdff',
  },
  corretaAtiva: {
    backgroundColor: '#d1fae5', // verdinho quando marcada
    borderColor: '#10b981',
  },
  corretaTxt: { color: cores.texto, fontWeight: '600' },
});

export const jogar = StyleSheet.create({
  cabecalho: { color: cores.textoSuave, fontWeight: '700' },

  pergunta: { color: cores.primEscuro, fontSize: 20, fontWeight: '800' },

  // barra de progresso
  barra: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#e2f2ff',
    borderWidth: 1,
    borderColor: '#bae6fd',
    overflow: 'hidden',
  },
  barraProg: { height: '100%', backgroundColor: cores.prim },

  // opções
  opcao: {
    ...comuns.card,
    backgroundColor: '#ffffff',
    borderColor: '#bae6fd',
    marginVertical: 6,
  },
  opcaoSelecionada: {
    borderColor: cores.prim,
    backgroundColor: '#dbeafe',
  },
  opcaoTxt: { color: cores.texto, fontSize: 16 },
});
