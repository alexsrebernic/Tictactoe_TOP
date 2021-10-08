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

const winsPlayer1 = document.querySelector("#wins_player1")
const winsPlayer2 = document.querySelector("#wins_player2")
const winsAi = document.querySelector("#wins_ai")

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
    signs= 0
    scoreAi = 0
    scorePlayer1 = 0
    scorePlayer2 = 0
    winsAi.textContent = ''
    winsPlayer1.textContent = ''
    winsPlayer2.textContent = ''
    player1.setTurn(true)
    player2.setTurn(false)
    machine.setTurn(false)
    player1.setArray([])  
    player2.setArray([]) 
    machine.setArray([])
    gamesIsOver = false
    gameBoard.resetBoard()
    setMessage("")
    boxesBoard.forEach(box => {
        box.textContent = '';
    })
}



function putSignOnBox(e){
    if(player2Side.style.display == "flex"){
        if(e.target.textContent !== '' || gamesIsOver) return
        if(player1.getTurn()){
            setSignInArray(player1,player2,"Its turn of Player 2",e)
        } else if (player2.getTurn()){
            setSignInArray(player2,player1,"Its turn of Player 1",e)
        }
        signs += 1
        if(checkWinner.checkPlayerWinner(player1.getArray())){
            resetSettings(winsPlayer1,"Player 1 Wins The Round!")
            scorePlayer1 += 1
        }
        if(checkWinner.checkPlayerWinner(player2.getArray())){
            resetSettings(winsPlayer2,"Player 2 Wins The Round!")   
            scorePlayer2 += 1

        }
        if(signs == 9) resetSettings(null,"It's a tie!",null)

        if(scorePlayer1 > 2 && scorePlayer1 === scorePlayer2 + 2 || scorePlayer1 === 3 && scorePlayer2 === 0) playerWins("Player 1 Wins!")

        if(scorePlayer2 > 2 && scorePlayer2 === scorePlayer1 + 2 || scorePlayer2 === 3 && scorePlayer1 === 0) playerWins("Player 2 Wins!")

    } else if (aiSide.style.display === "flex"){
        if(e.target.textContent !== '' || gamesIsOver)return
        if(player1.getTurn()){
            setMessage("")
            player1.getArray().push(parseInt(e.target.dataset.index))
            e.target.textContent = player1.getSign()
            gameBoard.setBox(parseInt(e.target.dataset.index),player1.getSign())
            signs += 1
            
            let arrayAvalaiblePositions = gameBoard.getBoard()
            .map((n,i) => {
                if(n == ""){
                    return i
                }
            })
            .filter(n => {
                return n != undefined
            })
                // The AI starts with a random position
                
                let randomPosition = Math.floor(Math.random() * arrayAvalaiblePositions.length)
                machine.getArray().push(arrayAvalaiblePositions[randomPosition])
                if(boxesBoard[arrayAvalaiblePositions[randomPosition]] !== undefined) boxesBoard[arrayAvalaiblePositions[randomPosition]].textContent = machine.getSign()
                gameBoard.setBox(arrayAvalaiblePositions[randomPosition],machine.getSign())
            signs += 1
                
            if(checkWinner.checkPlayerWinner(player1.getArray())){
                resetSettings(winsPlayer1,"Player 1 Wins The Round!")
                scorePlayer1 += 1
            }
            if(checkWinner.checkPlayerWinner(machine.getArray())){
                resetSettings(winsAi,"The AI Wins The Round!")
                scoreAi += 1
            }
            if(signs >= 9) resetSettings(null,"It's a tie!",null)
            if(scorePlayer1 > 2 && scorePlayer1 === scoreAi + 2 || scorePlayer1 === 3 && scoreAi === 0) playerWins("Player 1 Wins!")

            if(scoreAi > 2 && scoreAi === scorePlayer1 + 2 || scoreAi === 3 && scorePlayer1 === 0) playerWins("The AI Wins!")  
        }
    }
    
}
function playerWins(message){
    restartGameBoard()
    setMessage(message)
}

function setMessage(str){
    let para = document.getElementById("player_x_turn_text")
    para.textContent = str
    para.style.color = "white"
}

function setImg(player){
    let img = document.createElement("img")
    img.src = "./img/768px-White_check.svg.png"
    img.style.width = "15px"
    player.appendChild(img)
}

function resetSettings(player,message){
    player2.setArray([])
    player1.setArray([])
    machine.setArray([])
    setMessage(message) 
    gameBoard.resetBoard()
    boxesBoard.forEach(box => {
        box.textContent = '';
    })
    gamesIsOver = false
    signs= 0
    if(player != null) setImg(player)
}

function setSignInArray(winPlayer,loosePlayer,message,e){
    winPlayer.getArray().push(parseInt(e.target.dataset.index))
    e.target.textContent = winPlayer.getSign()
    gameBoard.setBox(parseInt(e.target.dataset.index),winPlayer.getSign())
    winPlayer.setTurn(false)
    loosePlayer.setTurn(true)
    setMessage(message)
}

function Player(sign,turn,wins,array){
    this.sign = sign
    this.turn = turn
    this.wins = wins
    this.array = array
    const getSign = () =>{
        return sign
    }
    const getTurn = () =>{
        return turn
    }
    const getWins = () =>{
        return wins
    }
    const getArray = () => {
        return array
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
    const setArray = (newArray) => {
        return array = newArray
    }
    return { getSign,getTurn,getWins,getArray,setArray,setSign,setTurn,setWins }
}
const player1 = Player("X",true,0,[])
const player2 = Player("O",false,[])
const machine = Player("O",false,[])
let gamesIsOver = false
let signs = 0
let bestCore = -Infinity

const gameBoard = (() => {
    const board = ["","","",
                   "","","",
                   "","",""]

    const setBox = (index,sign) => {
        if (index > board.length) return;
        board[index] = sign
    }
    const getBox = (index) => {
        if (index > board.length) return;
        return board[index]
    }
    const getBoard = () => {
        return board
    }
    const resetBoard = () => {
        for(let l = 0 ; l < board.length;l++){
            board[l] = ""
        }
    }
    return { setBox,getBox,getBoard,resetBoard }
})()

const checkWinner = (() => {
    
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
     const checkPlayerWinner = (arrayPlayer) => {
       
        for(let array of winConditions){
            if( array.every(r=> arrayPlayer.includes(r))){
                gamesIsOver = true
                return true
           } 
        }
     }
     return{ checkPlayerWinner }
})()
 const scores =  {
    X: 1,
    O: -1,
    tie:0
 }
