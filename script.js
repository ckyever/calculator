// Basic math operations
function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

// Represents our non-numeric buttons
const ADD_OPERATOR = '+';
const SUBTRACT_OPERATOR = '-';
const MULTIPLY_OPERATOR = '×';
const DIVIDE_OPERATOR = '÷';
const EQUALS_SIGN = '=';
const CLEAR_SIGN = 'C';
const DECIMAL_SIGN = '.';

// Wrapper function to determine which math operation should be done
function operate(x, y, operator) {
  let answer;
  x = Number(x);
  y = Number(y);

  switch (operator) {
    case ADD_OPERATOR:
      answer = add(x, y);
      break;
    case SUBTRACT_OPERATOR:
      answer = subtract(x, y);
      break;
    case MULTIPLY_OPERATOR:
      answer = multiply(x, y);
      break;
    case DIVIDE_OPERATOR:
      answer = divide(x, y);
      break;
    default:
      answer = null;
      console.warn(`Unknown operator ${operator}`);
  }

  return answer;
}

// Actual calculator logic below
let previousValue;
let currentValue;
let currentOperator;
let isNextValue = false;

const display = document.querySelector("output");

const digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isNextValue) {
      display.textContent = button.textContent;
      isNextValue = false;
    } else {
      display.textContent += button.textContent;
    }
    currentValue = display.textContent;
  });
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (previousValue && currentValue) {
      // Evaluate the previous pair of values first
      doEquals();
    }
    previousValue = currentValue;
    currentOperator = button.textContent;
    isNextValue = true;
  });
});

function doEquals() {
  if (previousValue && currentValue) {
    currentValue = operate(previousValue, currentValue, currentOperator);
    display.textContent = currentValue;
    previousValue = null;
    currentOperator = null;
  }
}
const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", () => doEquals());

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
  previousValue = null;
  currentValue = null;
  display.textContent = null;
  currentOperator = null;
});