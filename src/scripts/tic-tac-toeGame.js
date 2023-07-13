// Variáveis do jogo
let currentPlayer;
let player1;

// Referências HTML
const messageScreen = document.getElementById('message');
const gameScreen = document.getElementById('game');
const cellElements = document.querySelectorAll('[data-cell]');
const restart = document.getElementById('reset');
const startButton = document.getElementById('start-button');

console.log(cellElements)

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
            messageScreen.classList.remove('screen', 'fadeOutUp');
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
  console.log(selectedCell)
}

//Lida com os movimentos do jogador
function handlePlayerMove(selectedCell, selectedCellIndex){
    markCell(selectedCell, currentPlayer);
    
    removeCellClickListeners();

    if (checkWin(currentPlayer)) {
      setTimeout(() => {
        //verifica se o jogador atual venceu
        console.log('Vitória do jogador: ' + currentPlayer);
        alert('Jogador ' + currentPlayer + ' venceu!');
        // Implemente as ações apropriadas para lidar com a vitória (exibir mensagem, reiniciar o jogo, etc.)
      },500);
      } 
      else if (checkDraw()) {
        // Empate
      setTimeout(() => {
          alert('Empate!');
        }, 500);
        // Implemente as ações apropriadas para lidar com o empate (exibir mensagem, reiniciar o jogo, etc.)
      } 
      else {setTimeout(() => {
        togglePlayer();
        handleComputerMove();
      }, 500);
    }

}

// Adiciona a classe CSS na célula
function markCell(cell, player) {
  cell.classList.add(player === 'X' ? 'star' : 'cloud');
}

//responsável pela troca de jogador
function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Jogadas do computador
function handleComputerMove() {
    const emptyCells = Array.from(cellElements).filter(
      cell => !cell.classList.contains('star') && !cell.classList.contains('cloud')
    );
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCell = emptyCells[randomIndex];
  
    markCell(randomCell, currentPlayer);

    setTimeout(() => {
    if (checkWin(currentPlayer)) {
      console.log('Vitória do jogador: ' + currentPlayer);
      alert('Jogador ' + currentPlayer + ' venceu!');
      // Ações para lidar com a vitória
      return; // Retorne para evitar que o código continue executando
    }
    togglePlayer();
    addCellClickListeners();
    },500);
    
    
}

// Checa vitória
function checkWin(player) {
  const playerClass = player === 'X' ? 'star' : 'cloud';
  return winCombos.some(combo => {
    return combo.every(index => {
      const cell = cellElements[index];
      return cell.classList.contains(playerClass);
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







