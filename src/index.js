const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function playerInput(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

const mario = {
    Nome: "Mario",
    Velocidade: 4,
    Manobrabilidade: 3,
    Poder: 3,
    Pontos: 0
}

const luigi = {
    Nome: "Luigi",
    Velocidade: 3,
    Manobrabilidade: 4,
    Poder: 4,
    Pontos: 0
}

const peach = {
    Nome: "Peach",
    Velocidade: 3,
    Manobrabilidade: 4,
    Poder: 2,
    Pontos: 0
}

const yoshi = {
    Nome: "Yoshi",
    Velocidade: 2,
    Manobrabilidade: 4,
    Poder: 3,
    Pontos: 0
}

const bowser = {
    Nome: "Bowser",
    Velocidade: 5,
    Manobrabilidade: 2,
    Poder: 5,
    Pontos: 0
}

const dk = {
    Nome: "Donkey Kong",
    Velocidade: 2,
    Manobrabilidade: 2,
    Poder: 5,
    Pontos: 0
}

const player1 = {
    Nome: "",
    Velocidade: 0,
    Manobrabilidade: 0,
    Poder: 0,
    Pontos: 0
}

const player2 = {
    Nome: "",
    Velocidade: 0,
    Manobrabilidade: 0,
    Poder: 0,
    Pontos: 0
}

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = "Reta"
            break
        case random < 0.66:
            result = "Curva"
            break
        default:
            result = "Confronto"
    }
    return result
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁Rodada ${round}🏁`)
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()
        let totalTestSkill1 = 0
        let totalTestSkill2 = 0
        if (block === "Reta") {
            totalTestSkill1 = diceResult1 + character1.Velocidade
            totalTestSkill2 = diceResult2 + character2.Velocidade
            await logRollResult(character1.Nome, "Velocidade", diceResult1, character1.Velocidade)
            await logRollResult(character2.Nome, "Velocidade", diceResult2, character2.Velocidade)
        }
        if (block === "Curva") {
            totalTestSkill1 = diceResult1 + character1.Manobrabilidade
            totalTestSkill2 = diceResult2 + character2.Manobrabilidade
            await logRollResult(character1.Nome, "Manobrabilidade", diceResult1, character1.Manobrabilidade)
            await logRollResult(character2.Nome, "Manobrabilidade", diceResult2, character2.Manobrabilidade)
        }
        if (block === "Confronto") {
            let powerResult1 = diceResult1 + character1.Poder
            let powerResult2 = diceResult2 + character2.Poder
            console.log(`🥊${character1.Nome} confrontou ${character2.Nome}!🥊`)
            await logRollResult(character1.Nome, "Poder", diceResult1, character1.Poder)
            await logRollResult(character2.Nome, "Poder", diceResult2, character2.Poder)
            if (powerResult1 > powerResult2 && character2.Pontos > 0) {
                console.log(`${character1.Nome} venceu o confronto e ${character2.Nome} perdeu 1 ponto!💀`)
                character2.Pontos--
            }
            if (powerResult2 > powerResult1 && character1.Pontos > 0) {
                console.log(`${character2.Nome} venceu o confronto e ${character1.Nome} perdeu 1 ponto!💀`)
                character1.Pontos--
            }
            console.log(powerResult1 === powerResult2 ? "Confronto empatado! Nenhum ponto foi perdido!" : "")
        }
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.Nome} marcou um ponto!`)
            character1.Pontos++
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.Nome} marcou um ponto!`)
            character2.Pontos++
        }
        console.log("---------------------------------------------")
    }
}

async function declareWinner(character1, character2) {
    console.log("Resultado final:")
    console.log(`${character1.Nome}: ${character1.Pontos} ponto(s)`)
    console.log(`${character2.Nome}: ${character2.Pontos} ponto(s)`)
    if (character1.Pontos > character2.Pontos) {
        console.log(`\n${character1.Nome} venceu a corrida! Parabéns 🏆!`)
    } else if (character2.Pontos > character1.Pontos) {
        console.log(`\n${character2.Nome} venceu a corrida! Parabéns 🏆!`)
    } else {
        console.log("A corrida terminou empatada!")
    }
}

async function setChar(player, selectChar) {
    player.Nome = selectChar.Nome
    player.Velocidade = selectChar.Velocidade
    player.Manobrabilidade = selectChar.Manobrabilidade
    player.Poder = selectChar.Poder
    player.Pontos = selectChar.Pontos
}

async function chars(code, player) {
    switch (true) {
        case code == 1:
            await setChar(player, mario)
            break
        case code == 2:
            await setChar(player, luigi)
            break
        case code == 3:
            await setChar(player, peach)
            break
        case code == 4:
            await setChar(player, yoshi)
            break
        case code == 5:
            await setChar(player, bowser)
            break
        case code == 6:
            await setChar(player, dk)
            break
        default:
            console.log("Digite um número de 1 a 6")    
    }
}

async function selectCharacter() {
    console.log("Escolha o personagem do Player 1")
    let code1 = await playerInput("Digite 1 para Mário || Digite 2 para Luigi || Digite 3 para Peach || Digite 4 para Yoshi || Digite 5 para Bowser || Digite 6 para Donkey Kong \n")
    await chars(parseInt(code1), player1)
    console.log("Escolha o personagem do Player 2")
    let code2 = await playerInput("Digite 1 para Mário || Digite 2 para Luigi || Digite 3 para Peach || Digite 4 para Yoshi || Digite 5 para Bowser || Digite 6 para Donkey Kong \n")
    await chars(parseInt(code2), player2)
    rl.close()
}

(async function main() {
    await selectCharacter()
    console.log(`🏁 Corrida entre ${player1.Nome} ❌ ${player2.Nome} começando...🏁 \n`)
    await playRaceEngine(player1, player2)
    await declareWinner(player1, player2)
})()