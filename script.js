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

// Handle operations
const ADD_OPERATOR = '+';
const SUBTRACT_OPERATOR = '-';
const MULTIPLY_OPERATOR = '×';
const DIVIDE_OPERATOR = '÷';
const EQUALS_SIGN = '=';

// Use this for checks
const VALID_OPERATORS = ADD_OPERATOR + SUBTRACT_OPERATOR + MULTIPLY_OPERATOR + DIVIDE_OPERATOR + EQUALS_SIGN;

function operate(x, y, operator) {
  let answer;
  switch (operator) {
    case ADD_OPERATOR:
      answer = add(x, y);
      break;
    case SUBTRACT_OPERATOR:
      answer = add(x, y);
      break;
    case MULTIPLY_OPERATOR:
      answer = add(x, y);
      break;
    case DIVIDE_OPERATOR:
      answer = add(x, y);
      break;
    default:
      answer = null;
      console.warn(`Unknown operator ${operator}`);
  }

  return answer;
}

// Holds the operands and operator
let previousValue
let previousOperator;
let previousButton;

const display = document.querySelector("output");

function saveButtonHistory(button) {
  previousButton = button;
}

// Handle digit buttons
const digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (previousButton && (String(previousButton).includes(VALID_OPERATORS))) {
      display.value = button.textContent;
    } else {
      display.value += button.textContent;
    }
    saveButtonHistory(button.textContent);
  });
});