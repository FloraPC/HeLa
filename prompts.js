/* =========================================================
   PROMPTS, INSTRUÇÕES E TEXTOS DE SUPORTE (MUDI/UEM)
   ========================================================= */

const textoComoJogar = "Como jogar. O HeLa é um jogo de perguntas em cinco fases curtas. Leia ou ouça cada pergunta com calma. Toque na resposta que você acha certa. Não tem problema errar, o jogo sempre mostra e explica a resposta certa. Acertando três das cinco fases ou mais, você abre o cofre e vence. Use os botões A mais e A menos para deixar o texto maior ou menor. Use o botão contraste se precisar de cores mais fortes. Use o botão som para ligar ou desligar os efeitos sonoros.";

const textoIntroducao = "Bem-vindo à Sala HeLa! Um cofre guarda a saída — e ele só se abre com conhecimento. Em 5 desafios curtos, você vai aprender sobre a prevenção do câncer de colo do útero e da próstata, sobre autocuidado, e sobre a história de Henrietta Lacks. Acerte pelo menos 3 dos 5 desafios para abrir o cofre.";

const textoRecapVitoria = "O cofre se abriu! Você conseguiu! Por que isso importa: As células de Henrietta Lacks foram retiradas durante o tratamento de um câncer de colo do útero, em 1951, sem seu consentimento. Elas se tornaram a primeira linhagem humana capaz de se multiplicar indefinidamente em laboratório, impulsionando vacinas e pesquisas. O câncer de colo do útero está entre os que mais podem ser prevenidos. Homens também se cuidam: exames de rotina ajudam a prevenir e detectar cedo problemas na próstata. Falar sobre Henrietta Lacks também é falar sobre ética, consentimento e respeito.";

// Variável reativa global para salvar o texto do narrador dinâmico do estágio ativo
let textoLeituraAtual = "";
