// Referencia dos elementos HTML
const resultField = document.getElementById('result');

const equalButton = document.getElementsByClassName('equal');

const clearButton = document.getElementsByClassName('clear');


const operatorButton = document.getElementsByClassName('operator');

const buttons = Array.from(document.getElementsByClassName('btn'));

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

    // Verifica se o último caractere no campo de resultado é um operador
  const lastChar = currentValue[currentValue.length - 1];


  if (
    lastChar === ' ' ||
    (lastChar === '+' && operator !== '-') ||
    (lastChar === '-' && operator === '-')
  ) {
    // Remove o último caractere do campo de resultado
    resultField.value = currentValue.slice(0, -1);
  }
    // Adicionando o operador ao campo de resultado
    resultField.value += operator;
};

// Calcular o resultado
function calculateResult() {
     //Obtendo a expressão matemática que está no campo
     const expression = resultField.value;
    
     // Realizando a substituição dos operadores estilosos em expressões matemáticas
     const evaluatedExpression = expression
     .replace('×', '*')
     .replace('÷', '/');

      // Verificando se a expressão contém uma divisão por zero
     if (evaluatedExpression.includes('/0')) {
       resultField.value = 'Divisão por zero não é permitida';
       return;
     };

     // Calculando o resultado da expressão
        let result;
        try {
            // Utilizando o eval() permite avaliar uma string como código JavaScript e retornar o resultado desse código
            result = eval(evaluatedExpression);
        } catch (error) {
            result = 'Erro';
        }

        // Atualizando o campo de resultado com o resultado da expressão
        resultField.value = result;
    };