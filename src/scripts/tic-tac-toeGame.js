// Variáveis do jogo
let currentPlayer;
let gameActive = true;

//referencias HTML
const messageScreen = document.getElementById('message')

const gameScreen = document.getElementById('game');

const celElements = document.querySelectorAll('[data-cel]');

const restart = document.getElementsByClassName('reset');

const startButton = document.getElementById('start-button');

//combinações vencendoras
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

//seleciona primeiro player e inicia tela do jogo
startButton.addEventListener('click', selectPlayer);
function selectPlayer() {
    const player1 = document.querySelector('input[name="player1"]:checked').value;
    currentPlayer = player1;

    messageScreen.classList.add('fadeOutUp');
    setTimeout(() => {
        messageScreen.classList.remove('screen');
        messageScreen.style.display = 'none';
        gameScreen.classList.add('screen');
      }, 1000); 
    console.log(player1);
}

console.log(player1);
console.log(currentPlayer);



