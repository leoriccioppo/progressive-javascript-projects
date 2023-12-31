// Variáveis do jogo
let currentPlayer;
let player1;
let playerPC;

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
  
  // Define o jogador do computador com base na escolha do usuário
  playerPC = player1 === 'X' ? 'O' : 'X';
  animateTransition(gameScreen, addCellClickListeners);
}

// Cuida da animação entre a primeira e segunda tela
function animateTransition(screenToShow, callback) {

    if(screenToShow == gameScreen){
        //estilo botao
        restart.classList.add('btn');
        //remover display none
        screenToShow.style.removeProperty('display');
        messageScreen.classList.add('fadeOutUp');
        setTimeout(() => {
            screenToShow.classList.add('screen');   
            messageScreen.classList.remove('screen', 'fadeOutUp');
            startButton.classList.remove('btn');
            messageScreen.style.display = 'none';   
           // startButton.classList.add('btn');
        }, 1000);
    ;
        
    }else if (screenToShow == messageScreen){
        //estilo botao
        startButton.classList.add('btn');
        //remover display none
        screenToShow.style.removeProperty('display');
        gameScreen.classList.add('fadeOutUp');
        setTimeout(() => {
            screenToShow.classList.add('screen');
            gameScreen.classList.remove('screen');
            gameScreen.classList.remove('fadeOutUp');
            restart.classList.remove('btn');
            
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
  currentPlayer = player1;
    markCell(selectedCell, currentPlayer);
    
    removeCellClickListeners();

    //verifica se o jogador atual venceu
    if (checkWin(currentPlayer)) {
      setTimeout(() => {
        // Implemente as ações apropriadas para lidar com a vitória (exibir mensagem, reiniciar o jogo, etc.)
        showWinModal(currentPlayer);
        updateScore();
      },500);
      addCellClickListeners();
      } 
      else if (checkDraw()) {
        // Empate
      setTimeout(() => {
        // Implemente as ações apropriadas para lidar com o empate (exibir mensagem, reiniciar o jogo, etc.)
          showDrawModal();
          removeClass();
        }, 500);
        addCellClickListeners();

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
  currentPlayer = playerPC;

    const emptyCells = Array.from(cellElements).filter(
        cell => !cell.classList.contains('star') && !cell.classList.contains('cloud')
    );

    // Verifica se há alguma combinação em que o computador pode ganhar na próxima jogada
    for (const combo of winCombos) {
        const [a, b, c] = combo;
        const cells = [cellElements[a], cellElements[b], cellElements[c]];
        const computerCells = cells.filter(cell => cell.classList.contains('cloud'));
        const emptyCell = cells.find(cell => !cell.classList.contains('star') && !cell.classList.contains('cloud'));

        if (computerCells.length === 2 && emptyCell) {
            // O computador pode vencer na próxima jogada, então faz a jogada para ganhar o jogo
            markCell(emptyCell, currentPlayer);
            setTimeout(() => {
                if (checkWin(currentPlayer)) {
                    // Ações para lidar com a vitória
                    showWinModal(currentPlayer);
                    updateScore();
                    return; // Retorne para evitar que o código continue executando
                }
                togglePlayer();
                addCellClickListeners();
            }, 500);
            return;
        }
    }

    // Verifica se há alguma combinação em que o jogador humano pode ganhar na próxima jogada
    for (const combo of winCombos) {
        const [a, b, c] = combo;
        const cells = [cellElements[a], cellElements[b], cellElements[c]];
        const humanCells = cells.filter(cell => cell.classList.contains('star'));
        const emptyCell = cells.find(cell => !cell.classList.contains('star') && !cell.classList.contains('cloud'));

        if (humanCells.length === 2 && emptyCell) {
            // O jogador humano pode vencer na próxima jogada, então faz a jogada para bloquear a vitória
            markCell(emptyCell, currentPlayer);
            setTimeout(() => {
                togglePlayer();
                addCellClickListeners();
            }, 500);
            return;
        }
    }

    // Caso contrário, faz um movimento aleatório
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCell = emptyCells[randomIndex];

    markCell(randomCell, currentPlayer);

    setTimeout(() => {
        if (checkWin(currentPlayer)) {
          //lidar com a vitória
          updateScore();
          showWinModal(currentPlayer);
          return; 
        }
        togglePlayer();
        addCellClickListeners();
    }, 500);
}

//Placar
function updateScore(){
    const playerScoreElement = document.getElementById(`player${currentPlayer}-score`);
    let currentScore = parseInt(playerScoreElement.textContent);
    currentScore++;
    playerScoreElement.textContent = currentScore;
    removeClass();
    addCellClickListeners();
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

function removeClass(){
  cellElements.forEach(cell => {
    cell.classList.remove('star', 'cloud');
  });
}


// Reiniciar jogo
restart.addEventListener('click', startGame);
function startGame() {
    currentPlayer = null;
    player1 = null;

    removeClass();
    // Reiniciar o placar
    const playerXScoreElement = document.getElementById('playerX-score');
    const playerOScoreElement = document.getElementById('playerO-score');
    playerXScoreElement.textContent = '0';
    playerOScoreElement.textContent = '0';
  
    animateTransition(messageScreen, addCellClickListeners);
}


//mensagens
// Abrir o modal Empate
function showDrawModal() { 
  const drawModal = document.getElementById('drawModal');
  drawModal.classList.add('show');
  drawModal.showModal();
}

// Abrir modal vitória
function showWinModal(currentPlayer){
  const winModal = document.getElementById('winModal');
  winModal.classList.add('show');
  winModal.showModal();

  //atualizar simbolo do vencedor
  const winnerImage = document.getElementById('winnerImage');
  winnerImage.src = currentPlayer === 'X' ? '../../img/tic-tac-toeGame/star.svg' : '../../img/tic-tac-toeGame/cloud.svg';

 
}

// Fechar o modal
function closeModal() {
  const winModal = document.getElementById('winModal');
  const drawModal = document.getElementById('drawModal');

  winModal.close();
  winModal.classList.remove('show');
  drawModal.close();
  drawModal.classList.remove('show');
}