// Variáveis do jogo
let currentPlayer;
let gameActive = true;

//referencias HTML
const status = document.getElementsByClassName ('status');

const celElements = document.querySelectorAll('data-cel');

const restart = document.getElementsByClassName('restart');

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

//selecionar primeiro player 
function selectPlayer() {
    const player1 = document.querySelector('input[name="player1"]:checked').value;
    currentPlayer = player1;   
    
    //inicia a tela
    const button = document.querySelector('button');
    button.addEventListener('click',()=>{
        document.getElementById('message').style.display = 'none';
        document.getElementById('game').style.display = 'block';
    })
    console.log(player1);
}

