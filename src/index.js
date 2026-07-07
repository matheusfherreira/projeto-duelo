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

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block}: ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function xUmCabuloso(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`\n🏁 Rodada ${round}`);

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;
    let powerResult1 = 0;
    let powerResult2 = 0;

    const sorte = await getSorte();
    console.log(`Sorte da rodada: ${sorte}`);

    const diceResult1 = await rollDice();
    const diceResult2 = await rollDice();

    if (sorte === "RETA") {
      totalTestSkill1 = character1.VELOCIDADE + diceResult1;
      totalTestSkill2 = character2.VELOCIDADE + diceResult2;

      await logRollResult(
        character1.NOME,
        sorte,
        diceResult1,
        character1.VELOCIDADE
      );

      await logRollResult(
        character2.NOME,
        sorte,
        diceResult2,
        character2.VELOCIDADE
      );

      if (totalTestSkill1 > totalTestSkill2) {
        console.log(
          `🏆 ${character1.NOME} venceu a rodada com ${totalTestSkill1} contra ${totalTestSkill2}`
        );
        character1.PONTOS++;
      } else if (totalTestSkill2 > totalTestSkill1) {
        console.log(
          `🏆 ${character2.NOME} venceu a rodada com ${totalTestSkill2} contra ${totalTestSkill1}`
        );
        character2.PONTOS++;
      } else {
        console.log("🤝 Empate na rodada!");
      }
    }

    if (sorte === "CURVA") {
      totalTestSkill1 = character1.DRIBLE + diceResult1;
      totalTestSkill2 = character2.DRIBLE + diceResult2;

      await logRollResult(
        character1.NOME,
        sorte,
        diceResult1,
        character1.DRIBLE
      );

      await logRollResult(
        character2.NOME,
        sorte,
        diceResult2,
        character2.DRIBLE
      );

      if (totalTestSkill1 > totalTestSkill2) {
        console.log(
          `🏆 ${character1.NOME} venceu a rodada com ${totalTestSkill1} contra ${totalTestSkill2}`
        );
        character1.PONTOS++;
      } else if (totalTestSkill2 > totalTestSkill1) {
        console.log(
          `🏆 ${character2.NOME} venceu a rodada com ${totalTestSkill2} contra ${totalTestSkill1}`
        );
        character2.PONTOS++;
      } else {
        console.log("🤝 Empate na rodada!");
      }
    }

    if (sorte === "CONFRONTO") {
      powerResult1 = character1.CHUTE + diceResult1;
      powerResult2 = character2.CHUTE + diceResult2;

      console.log(
        `${character1.NOME} confrontou com ${character2.NOME}! ⚔️`
      );

      await logRollResult(
        character1.NOME,
        sorte,
        diceResult1,
        character1.CHUTE
      );

      await logRollResult(
        character2.NOME,
        sorte,
        diceResult2,
        character2.CHUTE
      );

      if (powerResult1 > powerResult2) {
        console.log(`${character1.NOME} venceu o confronto!`);

        if (character2.PONTOS > 0) {
          character2.PONTOS--;
          console.log(`${character2.NOME} perdeu 1 ponto! 🟥`);
        }
      } else if (powerResult2 > powerResult1) {
        console.log(`${character2.NOME} venceu o confronto!`);

        if (character1.PONTOS > 0) {
          character1.PONTOS--;
          console.log(`${character1.NOME} perdeu 1 ponto! 🟥`);
        }
      } else {
        console.log("🤝 Empate no confronto! Ninguém perde ponto.");
      }
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