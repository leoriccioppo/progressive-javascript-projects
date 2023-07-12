// Variáveis do jogo
let currentPlayer;


//referencias HTML
const messageScreen = document.getElementById('message')

const gameScreen = document.getElementById('game');

const cellElements = document.querySelectorAll('[data-cell]');

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

//seleciona primeiro player
startButton.addEventListener('click', selectPlayer);
function selectPlayer() {
    const player1 = document.querySelector('input[name="player1"]:checked').value;
    currentPlayer = player1;

    console.log(player1);
    
    animateTransition();    
}
//cuida da animação entre primeira e segunda tela
function animateTransition() {
    messageScreen.classList.add('fadeOutUp');
    setTimeout(() => {
      messageScreen.style.display = 'none';
      gameScreen.classList.add('screen');
    }, 1000);
}

//clique nas células do jogo
function handleCellClick(event) {
    //obter informações sobre a célula em que o clique ocorreu
    const selectedCell = event.target;
    const selectedCellIndex = parseInt(selectedCell.getAttribute('data-cel'));
    
    if (selectedCell.textContent !== '') {
        selectedCell.style.cursor ="block";
        return;
    }
    
    markCell(selectedCell, currentPlayer);
    


    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Alternar o jogador atual

}

function markCell(cell, player) {
    cell.classList.add(player === 'X' ? 'star' : 'cloud');
  }

  //evento a cada célula
cellElements.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });






