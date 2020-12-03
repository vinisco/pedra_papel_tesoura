const mensagem = document.querySelector(".mensagem");
const pontuacao = document.querySelector(".pontuacao");
const buttons = document.querySelectorAll("button");
const pontuacoes = [0, 0];

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", start);
}

function start(e) {
  //obtem escolha do usuario
  let opcaoUsuario = e;

  //obtem escolha do computador por um numero aleatorio
  let opcaoComputador = Math.random();

  if (opcaoComputador < 0.34) {
    opcaoComputador = "Pedra";
  } else if (opcaoComputador <= 0.67) {
    opcaoComputador = "Papel";
  } else {
    opcaoComputador = "Tesoura";
  }

  let resultado = verificarVencedor(opcaoUsuario, opcaoComputador);

  if (resultado === "Jogador") {
    resultado += " venceu!";
    pontuacoes[0]++;
  }

  if (resultado === "Computador") {
    resultado += " venceu!";
    pontuacoes[1]++;
  }

  if (resultado === "Empate") {
    resultado += ". Empate!";
  }

  pontuacao.innerHTML =
    "Jogador: [ " + pontuacoes[0] + " ] Computador: [ " + pontuacoes[1] + " ]";

  //Imprime as opcoes selecionadas
  ImprimeResultado(
    "Jogador: <strong>" +
      opcaoUsuario +
      "</strong> Computador: <strong>" +
      opcaoComputador +
      "</strong><br>" +
      resultado +
      "</strong> Escolha novamente! <strong>"
  );
}

function ImprimeResultado(texto) {
  mensagem.innerHTML = texto;
}

function verificarVencedor(jogador, computador) {
  if (jogador === computador) {
    return "Empate";
  }
  if (jogador === "Pedra") {
    if (computador === "Papel") {
      return "Computador";
    } else {
      return "Jogador";
    }
  }
  if (jogador === "Papel") {
    if (computador === "Tesoura") {
      return "Computador";
    } else {
      return "Jogador";
    }
  }
  if (jogador === "Tesoura") {
    if (computador === "Pedra") {
      return "Computador";
    } else {
      return "Jogador";
    }
  }
}

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
recognition.grammars = speechRecognitionList;

recognition.continuous = true;
recognition.lang = "pt-BR";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

//adiciona a pagina o evento de click para disparo da API

document.body.onload = function () {
  recognition.start();
};

var contador = 0;
recognition.onresult = function (event) {
  var last = event.results.length - 1;
  //Resultado recebido do comando de voz
  var texto = event.results[last][0].transcript;
  console.log("Confiança: " + event.results[0][0].confidence);

  function gerarTexto() {
    var escolhaDoJogador = texto.trim();
    var escolhaDoJogadorFormatado =
      escolhaDoJogador.charAt(0).toUpperCase() + escolhaDoJogador.slice(1);

    if (
      escolhaDoJogadorFormatado === "Papel" ||
      escolhaDoJogadorFormatado === "Pedra" ||
      escolhaDoJogadorFormatado === "Tesoura"
    ) {
      start(escolhaDoJogadorFormatado);
    } else {
      alert(
        `Fale novamente, "${escolhaDoJogadorFormatado}" não é uma opção do jogo`
      );
    }
  }
  gerarTexto();
};
