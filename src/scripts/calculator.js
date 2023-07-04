// Referencia dos elementos HTML
const resultField = document.getElementById('result');

const equalButton = document.getElementsByClassName('equal');

const clearButton = document.getElementsByClassName('clear');


const operatorButton = document.getElementsByClassName('operator');

const buttons = Array.from(document.getElementsByClassName('button'));

// Manipulador de evento de clique a cada botão
buttons.forEach(button => {
    button.addEventListener('click', () => {

        // Obtendo o valor do botão clicado
        const buttonText = button.textContent;

        //Verifica se é o botão de igual ou operador 
        if (button.classList.contains('operator')){
            handleOperator(buttonText);
        }
        else if(button.classList.contains('equal')){
            calculateResult();
        }
        else if (button.classList.contains('clear')){
            resultField.value = '';
        }
        else{
            // Atualizando o campo de resultado com o valor do botão
            resultField.value += buttonText;
        }
    });
  });



  
// Função para lidar com os operadores
function handleOperator(operator) {

    // Obtendo o valor atual do campo de resultado
    const currentValue = resultField.value;

    if (currentValue.includes('+') || currentValue.includes('-') || currentValue.includes('x') || currentValue.includes('÷')) {
        // Ignorando a operação se já existir uma
        return;
      }

    // Adicionando o operador ao campo de resultado
    resultField.value += operator;
};

// Calcular o resultado
function calculateResult() {
     //Obtendo a expressão matemática que está no campo
     const expression = resultField.value;

    try {
        // Realizando a substituição dos operadores estilosos em expressões matemáticas
        const evaluatedExpression = expression
        .replace('x', '*')
        .replace('÷', '/');
    
        // Utilizando o eval() permite avaliar uma string como código JavaScript e retornar o resultado desse código
        const result = eval(evaluatedExpression);

        // Atualizando o campo de resultado com o resultado da expressão
        resultField.value = result;
    } 
    catch (error) {
    // Tratando erros de sintaxe ou de cálculo inválido
    resultField.value = 'Erro';
}
};