const player1 = {
  NOME: "Cristiano Ronaldo",
  VELOCIDADE: 7,
  CHUTE: 6,
  DRIBLE: 10,
  PONTOS: 0,
};

const player2 = {
  NOME: "Messi",
  VELOCIDADE: 6,
  CHUTE: 7,
  DRIBLE: 10,
  PONTOS: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getSorte() {
  const random = Math.random();

  switch (true) {
    case random < 0.33:
      return "RETA";
    case random < 0.66:
      return "CURVA";
    default:
      return "CONFRONTO";
  }
}

async function getBola() {
  const random = Math.random();

  if (random < 0.5) {
    return { NOME: "TRIONDA", REDUCAO: 1 };
  }

  return { NOME: "JABULANI", REDUCAO: 2 };
}

// Pontos de dado: resultado do dado + o atributo testado (ex: VELOCIDADE, DRIBLE, CHUTE).
// É o valor usado para decidir quem vence a comparação da rodada.
function calcularPontosDeDado(dado, atributo) {
  return dado + atributo;
}

async function logPontosDeDado(characterName, block, dado, atributo) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block}: ${dado} + ${atributo} = ${calcularPontosDeDado(
      dado,
      atributo
    )}`
  );
}

// A bola só reduz o dado (parte que compõe os pontos de dado), nunca os pontos de rodada.
async function aplicarBolaNoDado(jogadorSorteado, dadoDoJogadorSorteado, bola) {
  console.log(`⚽ Bola do confronto: ${bola.NOME}!`);
  console.log(
    `${jogadorSorteado.NOME} perdeu ${bola.REDUCAO} pontos com a ${bola.NOME} ! 🟥`
  );

  return Math.max(0, dadoDoJogadorSorteado - bola.REDUCAO);
}

// Pontos de rodada: ganhos só ao final, comparando os pontos de dado dos dois jogadores.
function compararPontosDeDadoEPontuar(character1, pontosDeDado1, character2, pontosDeDado2) {
  if (pontosDeDado1 > pontosDeDado2) {
    console.log(
      `🏆 ${character1.NOME} venceu a rodada com ${pontosDeDado1} contra ${pontosDeDado2}`
    );
    character1.PONTOS++;
  } else if (pontosDeDado2 > pontosDeDado1) {
    console.log(
      `🏆 ${character2.NOME} venceu a rodada com ${pontosDeDado2} contra ${pontosDeDado1}`
    );
    character2.PONTOS++;
  } else {
    console.log("🤝 Empate na rodada!");
  }
}

async function resolverTesteDeAtributo(character1, character2, sorte, atributo1, dado1, atributo2, dado2) {
  await logPontosDeDado(character1.NOME, sorte, dado1, atributo1);
  await logPontosDeDado(character2.NOME, sorte, dado2, atributo2);

  const pontosDeDado1 = calcularPontosDeDado(dado1, atributo1);
  const pontosDeDado2 = calcularPontosDeDado(dado2, atributo2);

  compararPontosDeDadoEPontuar(character1, pontosDeDado1, character2, pontosDeDado2);
}

async function resolverConfronto(character1, character2, sorte, diceResult1, diceResult2) {
  console.log("");
  console.log(`${character1.NOME} confrontou com ${character2.NOME}! ⚔️`);

  await logPontosDeDado(character1.NOME, sorte, diceResult1, character1.CHUTE);
  await logPontosDeDado(character2.NOME, sorte, diceResult2, character2.CHUTE);

  console.log("");

  const bola = await getBola();
  const jogadorSorteado = Math.random() < 0.5 ? character1 : character2;

  let dadoFinal1 = diceResult1;
  let dadoFinal2 = diceResult2;

  if (jogadorSorteado === character1) {
    dadoFinal1 = await aplicarBolaNoDado(character1, diceResult1, bola);
  } else {
    dadoFinal2 = await aplicarBolaNoDado(character2, diceResult2, bola);
  }

  console.log("");

  const pontosDeDado1 = calcularPontosDeDado(dadoFinal1, character1.CHUTE);
  const pontosDeDado2 = calcularPontosDeDado(dadoFinal2, character2.CHUTE);

  compararPontosDeDadoEPontuar(character1, pontosDeDado1, character2, pontosDeDado2);
}

async function xUmCabuloso(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`\n🏁 Rodada ${round}`);

    const sorte = await getSorte();
    console.log(`Sorte da rodada: ${sorte}`);

    const diceResult1 = await rollDice();
    const diceResult2 = await rollDice();

    if (sorte === "RETA") {
      await resolverTesteDeAtributo(
        character1,
        character2,
        sorte,
        character1.VELOCIDADE,
        diceResult1,
        character2.VELOCIDADE,
        diceResult2
      );
    }

    if (sorte === "CURVA") {
      await resolverTesteDeAtributo(
        character1,
        character2,
        sorte,
        character1.DRIBLE,
        diceResult1,
        character2.DRIBLE,
        diceResult2
      );
    }

    if (sorte === "CONFRONTO") {
      await resolverConfronto(character1, character2, sorte, diceResult1, diceResult2);
    }

    console.log("---------------------------------------------");
  }
}

async function declareWinner(character1, character2) {
  console.log("\n🏁 Resultado Final");
  console.log(`${character1.NOME}: ${character1.PONTOS} pontos`);
  console.log(`${character2.NOME}: ${character2.PONTOS} pontos`);

  if (character1.PONTOS > character2.PONTOS) {
    console.log(`\n🏆 ${character1.NOME} é o vencedor do x1! 🎆`);
  } else if (character2.PONTOS > character1.PONTOS) {
    console.log(`\n🏆 ${character2.NOME} é o vencedor do x1! 🎆`);
  } else {
    console.log("\n🤝 Empate! Ninguém venceu o x1.");
  }
}

(async function main() {
  console.log(`🏁🚨 X1 entre ${player1.NOME} e ${player2.NOME}...\n`);

  await xUmCabuloso(player1, player2);
  await declareWinner(player1, player2);
})();