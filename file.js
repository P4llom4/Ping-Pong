
// Carrega os primeiros comandos
window.onload = function () {
  inciar(); // Inicializa os comandos e variáveis
  setInterval(principal, 1000 / 30); // Roda o jogo dentro do laço
}


// Carrega os primeiros comandos
window.onload = function () {
  iniciar(); // Inicializa os comandos e variáveis

  setInterval(principal, 1000 / 30); // Roda o jogo dentro do laço
};

function iniciar() {
  folhaDesenho = document.getElementById('folha');
  areaDesenho = folhaDesenho.getContext('2d');

  larguraCampo = 600;
  alturaCampo = 500;
  espessuraRede = 5;

  diametroBola = 10;

  espessuraRaquete = 11;
  alturaRaquete = 100;

  efeitoRaquete = 0.3;
  velocidadeJogador2 = 5;

  posicaoJogador1 = posicaoJogador2 = 10;
  posicaoBolaX = posicaoBolaY = 10;
  velocidadeBolaPosicaoX = velocidadeBolaPosicaoY = 5;
  pontuacaoJogador1 = pontuacaoJogador2 = 0;

  folhaDesenho.addEventListener('mousemove', function (e) {
    posicaoJogador1 = e.clientY - alturaRaquete /2;
  });
}

function principal() {
  desenhar();
  calcular();
}

function desenhar() {
  areaDesenho.fillStyle = '#0174DF';
  areaDesenho.fillRect(0, 0, larguraCampo, alturaCampo);

  areaDesenho.fillStyle = '#ffffff';

  // Linha
  areaDesenho.fillRect(
    larguraCampo / 2 - espessuraRede / 2,
    0,
    espessuraRede,
    alturaCampo,
  );

  // Desenha a bola
  areaDesenho.fillRect(
    posicaoBolaX - diametroBola / 2,
    posicaoBolaY - diametroBola / 2,
    diametroBola,
    diametroBola,
  );

  // Raquetes
  areaDesenho.fillRect(
    0,
    posicaoJogador1,
    espessuraRaquete,
    alturaRaquete,
  );
  areaDesenho.fillRect(
    larguraCampo - espessuraRaquete,
    posicaoJogador2,
    espessuraRaquete,
    alturaRaquete,
  );

  areaDesenho.fillText(
    'Player - ' + pontuacaoJogador1, 100, 100,);

  areaDesenho.fillText(
    'Computer - ' + pontuacaoJogador2, larguraCampo - 200, 100,);
} 

function calcular() {
  posicaoBolaX = posicaoBolaX + velocidadeBolaPosicaoX;
  posicaoBolaY = posicaoBolaY + velocidadeBolaPosicaoY;

  // Verifica a lateral superior
  if (posicaoBolaY < 0 && velocidadeBolaPosicaoY < 0) {
    velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
  }

  // Verifica a lateral inferior
  if (posicaoBolaY > alturaCampo && velocidadeBolaPosicaoY > 0) {
    velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
  }

  // Verifica se o Jogador 2 fez um ponto
  if (posicaoBolaX < 0) {
    if (
      posicaoBolaY > posicaoJogador1 &&
      posicaoBolaY < posicaoJogador1 + alturaRaquete
    ) {
      // Rebate a bola
      velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;

      var diferencaY =
        posicaoBolaY - (posicaoJogador1 + alturaRaquete / 2);
      velocidadeBolaPosicaoY = diferencaY * efeitoRaquete;
    } else {
      // Pontos do Jogador 2
      pontuacaoJogador2 = pontuacaoJogador2 + 1;
      // Coloca a bola no centro
      continuar();
    }
  }

  // Verifica se o Jogador 1 fez um ponto
  if (posicaoBolaX > larguraCampo) {
    if (
      posicaoBolaY > posicaoJogador2 &&
      posicaoBolaY < posicaoJogador2 + alturaRaquete
    ) {
      velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;

      var diferencaY =
        posicaoBolaY - (posicaoJogador2 + alturaRaquete / 2);
      velocidadeBolaPosicaoY = diferencaY * efeitoRaquete;
    } else {
      // Pontos do Jogador 1
      pontuacaoJogador1 = pontuacaoJogador1 + 1;
      // Coloca a bola no centro
      continuar();
    }
  }

  // Atualiza a posição Jogador 2
  if (posicaoJogador2 + alturaRaquete / 2 < posicaoBolaY) {
    posicaoJogador2 = posicaoJogador2 + velocidadeJogador2;
  } else {
    posicaoJogador2 = posicaoJogador2 - velocidadeJogador2;
  }
}

function continuar() {
  // Coloca a bola no centro
  posicaoBolaX = larguraCampo / 2;
  posicaoBolaY = alturaCampo / 2;
  velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
  velocidadeBolaPosicaoY = 3;
}
