// Variáveis do jogo
let currentPlayer;
let player1;

// Referências HTML
const messageScreen = document.getElementById('message');
const gameScreen = document.getElementById('game');
const cellElements = document.querySelectorAll('[data-cell]');
const restart = document.getElementById('reset');
const startButton = document.getElementById('start-button');

// Combinações vencedoras
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Seleciona primeiro jogador
startButton.addEventListener('click', selectPlayer);

function selectPlayer() {
  player1 = document.querySelector('input[name="player1"]:checked').value;
  currentPlayer = player1;
  console.log(player1);
  animateTransition(gameScreen, addCellClickListeners);
}

// Cuida da animação entre a primeira e segunda tela
function animateTransition(screenToShow, callback) {

    if(screenToShow == gameScreen){
        //remover display none
        screenToShow.style.removeProperty('display');
        messageScreen.classList.add('fadeOutUp');
        setTimeout(() => {
            screenToShow.classList.add('screen');   
            messageScreen.classList.remove('screen');
            messageScreen.classList.remove('fadeOutUp'); 
            messageScreen.style.display = 'none';   
        }, 1000);
    ;
        
    }else if (screenToShow == messageScreen){
        //remover display none
        screenToShow.style.removeProperty('display');
        gameScreen.classList.add('fadeOutUp');
        setTimeout(() => {
            screenToShow.classList.add('screen');
            gameScreen.classList.remove('screen')
            gameScreen.classList.remove('fadeOutUp')
            
        }, 1000);
        
        

    }
    callback();
}
  

// Adiciona listener de clique nas células
function addCellClickListeners() {
  cellElements.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });
}

// Verifica se a célula está ocupada
function isCellOccupied(cell) {
  return cell.classList.contains('star') || cell.classList.contains('cloud');
}

// Remove listener de clique das células
function removeCellClickListeners() {
  cellElements.forEach(cell => {
    cell.removeEventListener('click', handleCellClick);
  });
}

// Clique nas células do jogo
function handleCellClick(event) {
  // Obter informações sobre a célula em que o clique ocorreu
  const selectedCell = event.target;
  const selectedCellIndex = parseInt(selectedCell.getAttribute('data-cell'));

  if (isCellOccupied(selectedCell)) {
    selectedCell.style.cursor = 'block';
    return;
  }

  handlePlayerMove(selectedCell, selectedCellIndex);
}

//Lida com os movimentos do jogador
function handlePlayerMove(selectedCell, selectedCellIndex){
    markCell(selectedCell, currentPlayer);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    removeCellClickListeners();

    if (checkWin(currentPlayer)) {
        // O jogador atual venceu
        alert('Jogador ' + currentPlayer + ' venceu!');
        // Implemente as ações apropriadas para lidar com a vitória (exibir mensagem, reiniciar o jogo, etc.)
      } else if (checkDraw()) {
        // Empate
        setTimeout(() => {
          alert('Empate!');
        }, 500);
        // Implemente as ações apropriadas para lidar com o empate (exibir mensagem, reiniciar o jogo, etc.)
      } else {setTimeout(() => {
        handleComputerMove();
      }, 500);
    }

}

// Adiciona a classe CSS na célula
function markCell(cell, player) {
  cell.classList.add(player === 'X' ? 'star' : 'cloud');
}

// Jogadas do computador
function handleComputerMove() {
    const emptyCells = Array.from(cellElements).filter(
      cell => !cell.classList.contains('star') && !cell.classList.contains('cloud')
    );
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCell = emptyCells[randomIndex];
  
    markCell(randomCell, currentPlayer);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  
    addCellClickListeners();
}

// Checa vitória
function checkWin(player) {
  return winCombos.some(combo => {
    return combo.every(index => {
      const cell = cellElements[index];
      return cell.classList.contains(player === 'X' ? 'star' : 'cloud');
    });
  });
}

// Checa empate
function checkDraw() {
  return Array.from(cellElements).every(cell => isCellOccupied(cell));
}

// Reiniciar jogo
restart.addEventListener('click', startGame);
function startGame() {
    currentPlayer = null;
    player1 = null;
  
    cellElements.forEach(cell => {
      cell.classList.remove('star', 'cloud');
    });
  
    animateTransition(messageScreen, addCellClickListeners);
}







