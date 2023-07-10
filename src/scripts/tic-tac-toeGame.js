// Variáveis do jogo
let currentPlayer = 'X';
let secondPlayer = 'O';
let gameActive = true;

//referencias HTML
const status = document.getElementsByClassName ('status');

const cells = document.querySelectorAll('.cell');

const restart = document.getElementsByClassName('restart');

cells.forEach(cell=>{
    cell.addEventListener('click', handleCLick);
})