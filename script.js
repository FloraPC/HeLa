/* =========================================================
   BOLHAS FLUTUANTES DE FUNDO
   ========================================================= */
(function gerarBolhas(){
  const container = document.getElementById('bolhas');
  if(!container) return;
  const cores = ['#FFC9D1','#E7DEFB','#FFE3C2','#C9F0E6','#F9D6E8'];
  const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const total = reduzMovimento ? 8 : 16;

  for(let i=0; i<total; i++){
    const b = document.createElement('div');
    b.className = "bolha";
    const tamanho = 18 + Math.random()*46;
    b.style.width = tamanho + "px";
    b.style.height = tamanho + "px";
    b.style.left = (Math.random()*100) + "%";
    b.style.background = cores[i % cores.length];
    b.style.animationDuration = (14 + Math.random()*14) + "s";
    b.style.animationDelay = (Math.random()*14) + "s";
    container.appendChild(b);
  }
})();

/* =========================================================
   ACESSIBILIDADE: FONTE, CONTRASTE, SOM, VOZ, MODAL
   ========================================================= */

// ---------- Tamanho da fonte (mínimo 22px) ----------
const FONTE_MIN = 22;
const FONTE_MAX = 34;
let tamanhoFonteAtual = FONTE_MIN;

function mudarFonte(direcao){
  tamanhoFonteAtual = Math.min(FONTE_MAX, Math.max(FONTE_MIN, tamanhoFonteAtual + direcao*2));
  document.documentElement.style.fontSize = tamanhoFonteAtual + "px";
}

// ---------- Alto contraste ----------
let contrasteAtivo = false;
function alternarContraste(){
  contrasteAtivo = !contrasteAtivo;
  document.body.classList.toggle('alto-contraste', contrasteAtivo);
  document.getElementById('btn-contraste').setAttribute('aria-pressed', String(contrasteAtivo));
}

// ---------- Som (efeitos sonoros simples via Web Audio) ----------
let somLigado = true;
let audioCtx = null;

function garantirAudioCtx(){
  if(!audioCtx){
    const AC = window.AudioContext || window.webkitAudioContext;
    if(AC) audioCtx = new AC();
  }
  if(audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
}

function tocarTom(freq, duracao, tipo){
  if(!somLigado || (!window.AudioContext && !window.webkitAudioContext)) return;
  garantirAudioCtx();
  if(!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = tipo || 'sine';
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime+0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime+duracao);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime+duracao+0.02);
}

function tocarSomAcerto(){ tocarTom(880,0.16,'sine'); setTimeout(()=>tocarTom(1108,0.18,'sine'),110); }
function tocarSomErro(){ tocarTom(220,0.28,'sawtooth'); }
function tocarSomVitoria(){ tocarTom(659,0.15,'sine'); setTimeout(()=>tocarTom(880,0.15,'sine'),150); setTimeout(()=>tocarTom(1108,0.28,'sine'),300); }
function tocarSomFalha(){ tocarTom(300,0.3,'sawtooth'); setTimeout(()=>tocarTom(190,0.35,'sawtooth'),220); }

function alternarSom(){
  somLigado = !somLigado;
  const btn = document.getElementById('btn-som');
  btn.textContent = somLigado ? "🔊 Som" : "🔇 Som";
  btn.setAttribute('aria-pressed', String(!somLigado));
  if(somLigado){ garantirAudioCtx(); tocarTom(660,0.12,'sine'); }
}

// ---------- Leitura por voz (instruções) ----------
function lerTexto(texto){
  if(!texto) return;
  if(!('speechSynthesis' in window)){
    alert('A leitura por voz não é compatível com este navegador.');
    return;
  }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(texto);
  utter.lang = 'pt-BR';
  utter.rate = 0.95;
  window.speechSynthesis.speak(utter);
}

function removerTags(html){
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g,' ').trim();
}

// ---------- Textos Utilitários para Narrador ----------
const textoComoJogar = "Como jogar. O HeLa é um jogo de perguntas em cinco fases curtas. Leia ou ouça cada pergunta com calma. Toque na resposta que você acha certa. Não tem problema errar, o jogo sempre mostra e explica a resposta certa. Acertando três das cinco fases ou mais, você abre o cofre e vence. Use os botões A mais e A menos para deixar o texto maior ou menor. Use o botão contraste se precisar de cores mais fortes. Use o botão som para ligar ou desligar os efeitos sonoros.";
const textoIntroducao = "Bem-vindo à Sala HeLa! Um cofre guarda a saída — e ele só se abre com conhecimento. Em 5 desafios curtos, você vai aprender sobre a prevenção do câncer de colo do útero e da próstata, sobre autocuidado, e sobre a história de Henrietta Lacks. Acerte pelo menos 3 dos 5 desafios para abrir o cofre.";
const textoRecapVitoria = "O cofre se abriu! Você conseguiu! Por que isso importa: As células de Henrietta Lacks foram retiradas durante o tratamento de um câncer de colo do útero, em 1951, sem seu consentimento. Elas se tornaram a primeira linhagem humana capaz de se multiplicar indefinidamente em laboratório, impulsionando vacinas e pesquisas. O câncer de colo do útero está entre os que mais podem ser prevenidos. Homens também se cuidam: exames de rotina ajudam a prevenir e detectar cedo problemas na próstata. Falar sobre Henrietta Lacks também é falar sobre ética, consentimento e respeito.";
let textoLeituraAtual = ""; 

/* =========================================================
   GERENCIAMENTO DE MODAL (Código Corrigido e Completado)
   ========================================================= */
function abrirComoJogar(){
  const modal = document.getElementById('modal-overlay');
  if(modal) modal.classList.remove('hidden');
}

function fecharComoJogar(){
  const modal = document.getElementById('modal-overlay');
  if(modal) modal.classList.add('hidden');
}

function fecharComoJogarSeForFundo(event){
  if(event.target.id === 'modal-overlay'){
    fecharComoJogar();
  }
}

// Declarações base das funções do ciclo de jogo para evitar erros de inicialização caso chamadas prematuramente
function iniciarJogo() { console.log('Iniciar Jogo'); }
function reiniciarJogo() { console.log('Reiniciar Jogo'); }
function avançarFase() { console.log('Avançar Fase'); }
