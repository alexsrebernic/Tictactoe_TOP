const startGameButton = document.querySelector("#start_game_button")
const vsAiButton = document.querySelector("#vs_ai")
const vsPlayerButton = document.querySelector("#vs_player")
const restartButton = document.querySelector("#restart_button")
const changeOpponentButton = document.querySelector("#change_opponent_button")

const startGameDisplay = document.querySelector("#start_game")
const chooseOpponentDisplay = document.querySelector("#buttonvs")
const gameplayDisplay = document.querySelector("#gameplay")

const player1Side = document.querySelector("#player_1_side")
const player2Side = document.querySelector("#player_2_side")
const aiSide = document.querySelector("#ai_side")

const textPlayer1Side = document.querySelector("#sign_player_1")
const textPlayer2Side = document.querySelector("#sign_player_2")
const textAiSide = document.querySelector("#sign_ai")

const textWinsPlayer1 = document.querySelector("#wins_player1")
const textWinsPlayer2 = document.querySelector("#wins_player2")
const textWinsAi = document.querySelector("#wins_ai")

const playerXTurnText = document.querySelector("#player_x_turn_text")

const boxesBoard = document.querySelectorAll(".box")

startGameButton.onclick = () => changeDisplayToChooseOpponentDisplay()
vsAiButton.onclick = () => changeDisplayToGameplayDisplayIa()
vsPlayerButton.onclick = () => changeDisplayToGameplayDisplayPlayer()
restartButton.onclick = () => restartGameBoard()
changeOpponentButton.onclick = () => changeDisplayToChooseOpponentDisplay()
boxesBoard.forEach(box => {
    box.onclick = (e) => putSignOnBox(e)
})

let scorePlayer1 = 0
let scorePlayer2 = 0
let scoreAi = 0



function changeDisplayToChooseOpponentDisplay(){
    restartGameBoard()
    gameplayDisplay.setAttribute("class","animation")
    startGameDisplay.setAttribute("class", "animation")
    setTimeout(function(){
    gameplayDisplay.style.display = "none"
    startGameDisplay.style.display = "none"
    chooseOpponentDisplay.style.display = "flex"
    chooseOpponentDisplay.setAttribute("class","emerge")
    },1000)
}
function changeDisplayToGameplayDisplayIa(){
    restartGameBoard()
    chooseOpponentDisplay.removeAttribute("animation")
    chooseOpponentDisplay.setAttribute("class","animation")
        setTimeout(function(){
            player2Side.style.display = "none"
            chooseOpponentDisplay.style.display = "none"
            aiSide.style.display = "flex"
            gameplayDisplay.style.display = "flex"
            gameplayDisplay.setAttribute("class","emerge")
        },1000) 
}
function changeDisplayToGameplayDisplayPlayer(){
    restartGameBoard()
    chooseOpponentDisplay.removeAttribute("animation")
    chooseOpponentDisplay.setAttribute("class","animation")
    setTimeout(function(){
        chooseOpponentDisplay.style.display = "none"
        aiSide.style.display = "none"
        player2Side.style.display = "flex"
        gameplayDisplay.style.display = "flex"
        gameplayDisplay.setAttribute("class","emerge")
    },1000)
}
function restartGameBoard(){
    scoreAi = 0
    scorePlayer1 = 0
    scorePlayer2 = 0
    textWinsAi.textContent = ''
    textWinsPlayer1.textContent = ''
    textWinsPlayer2.textContent = 
    boxesBoard.forEach(box => {
        box.textContent = '';
    })
}

function putSignOnBox(e){
    if(e.target.textContent !== '') console.log("asd")
    if(player1.getTurn){

        player1.setTurn(false)
    }
}
function Player(sign,turn,wins){
    this.sign = sign
    this.turn = turn
    this.wins = wins

    const getSign = () =>{
        return sign
    }
    const getTurn = () =>{
        return turn
    }
    const getWins = () =>{
        return wins
    }
    const setSign = (newSign) =>{
        return sign = newSign
    }
    const setTurn = (newTurn) => {
        return turn = newTurn
    }
    const setWins = (newWins) => {
        return wins = newWins
    }

    return { getSign,getTurn,getWins,setSign,setTurn,setWins }
}
let player1 = Player("X",true,0)
let player2 = Player("O",false,0)
let machine = Player("O",false,0)


const gameBoard = (() => {
    const board = ["","","","","","","","",""]
})()


    