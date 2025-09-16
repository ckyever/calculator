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

const ADD_OPERATOR = '+';
const SUBTRACT_OPERATOR = '-';
const MULTIPLY_OPERATOR = '×';
const DIVIDE_OPERATOR = '÷';
const EQUALS_SIGN = '=';

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

// Holds the operands and operator
let previousValue
let previousOperator;
let previousButton;

const display = document.querySelector("output");

function saveButtonHistory(button) {
  previousButton = button;
}

function addNextNumber(number) {
  previousValue = display.value;
  display.value = number;
}

const VALID_OPERATORS = ADD_OPERATOR + SUBTRACT_OPERATOR + MULTIPLY_OPERATOR + DIVIDE_OPERATOR + EQUALS_SIGN;

// Handle digit buttons
const digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (previousButton && (VALID_OPERATORS.includes(String(previousButton)))) {
      addNextNumber(button.textContent);
    } else {
      display.value += button.textContent;
    }
    saveButtonHistory(button.textContent);
  });
});

// Handle operator button pressed
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(button => {
  button.addEventListener("click", () => {
    // If we have a previous number and numbers in the current display do operate
    if (previousValue != null && display.value != null) {
      display.value = operate(previousValue, display.value, button.textContent);
    }
    saveButtonHistory(button.textContent);
  });
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () =>{
  previousValue = null;
  previousOperator = null;
  saveButtonHistory(clearButton.textContent);
  display.value = "";
});