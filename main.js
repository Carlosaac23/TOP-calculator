const display = document.getElementById('display');
const keys = document.querySelectorAll('button');

keys.forEach(key => {
  key.addEventListener('click', () => {
    const value = key.textContent;

    if (value === 'AC') {
      display.value = '';
    } else if (value === 'DEL') {
      display.value = display.value.slice(0, -1);
    } else if (value === '=' || value === 'enter') {
      calculate();
    } else {
      display.value += value;
    }
  });
});

window.addEventListener('keydown', e => {
  const key = e.key;
  const validKeys = ['+', '-', '/', 'x', '*', '.'];

  if (!isNaN(key)) {
    display.value += key;
  } else if (validKeys.includes(key)) {
    display.value += key;
  } else if (key === 'Escape') {
    display.value = '';
  } else if (key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (key === 'Enter' || key === '=') {
    calculate();
  } else {
    return;
  }
});

function add(number1, number2) {
  return number1 + number2;
}

function subtract(number1, number2) {
  return number1 - number2;
}

function multiply(number1, number2) {
  return number1 * number2;
}

function divide(number1, number2) {
  return number2 === 0 ? 'Error' : number1 / number2;
}

function operate(operator, number1, number2) {
  if (operator === '+') {
    return add(number1, number2);
  } else if (operator === '-') {
    return subtract(number1, number2);
  } else if (operator === 'x' || operator === '*') {
    return multiply(number1, number2);
  } else {
    return divide(number1, number2);
  }
}

function calculate() {
  const expression = display.value;

  const match = expression.match(/(\d+(?:\.\d+)?)([+\-x*/])(\d+(?:\.\d+)?)/);

  if (!match) {
    display.value = 'Error';
    return;
  }

  const number1 = parseFloat(match[1]);
  const operator = match[2];
  const number2 = parseFloat(match[3]);

  const result = operate(operator, number1, number2);
  display.value = result;
}
