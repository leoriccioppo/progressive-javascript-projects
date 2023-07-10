// Variáveis do jogo
let currentPlayer = 'X';
let secondPlayer = 'O';
let gameActive = true;

//referencias HTML
const status = document.getElementsByClassName ('status');

const celElements = document.querySelectorAll("['data-cel']");

const restart = document.getElementsByClassName('restart');

//exibir a jogador na tela
const avatarPlayer = (cel, classToAdd) =>{
    cel.classList.add(classToAdd);
}



celElements.forEach(cel=>{
    cel.addEventListener('click', handleCLick, {once: true});
})