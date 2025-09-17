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

const OPERATOR_CHECK = ADD_OPERATOR + SUBTRACT_OPERATOR + MULTIPLY_OPERATOR + DIVIDE_OPERATOR;
function isOperator(check) {
  return OPERATOR_CHECK.includes(check);
}

const ZERO_DIVISION_MESSAGE = "Can't divide by 0 little bro"

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
      if (y === 0) {
        answer = ZERO_DIVISION_MESSAGE
      } else {
        answer = divide(x, y);
      }
      break;
    default:
      answer = null;
      console.warn(`Unknown operator ${operator}`);
  }

  return answer;
}

// Actual calculator logic below
let previousValue;
let currentOperator;
let currentValue;
let previousButtonPressed;
let isNextValue = false;

const display = document.querySelector("output");

const digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentValue === "0" && !isNextValue) {
      // Can't add numbers after 0
      return
    }
    if (isNextValue) {
      display.textContent = button.textContent;
      isNextValue = false;
    } else {
      display.textContent += button.textContent;
    }
    currentValue = display.textContent;
    previousButtonPressed = button.textContent;
  });
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isOperator(previousButtonPressed)) {
      currentOperator = button.textContent;
      return;
    }
    if (previousValue && currentValue) {
      // Evaluate the previous pair of values first
      doEquals();
    }
    previousValue = currentValue;
    currentOperator = button.textContent;
    isNextValue = true;
    previousButtonPressed = button.textContent;
  });
});

function doEquals() {
  // If previous value is not a number (e.g. error message) then ignore the operation
  if (Number(previousValue) && currentValue) {
    currentValue = operate(previousValue, currentValue, currentOperator);
    display.textContent = currentValue;
    previousValue = null;
    currentOperator = null;
  }
}
const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", () => {
  if (!isOperator(previousButtonPressed)) {
    doEquals()
  }
  previousValue = null;
  currentOperator = null;
  isNextValue = true;
  previousButtonPressed = equalsButton.textContent;
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
  previousValue = null;
  currentValue = null;
  display.textContent = null;
  currentOperator = null;
  previousButtonPressed = clearButton.textContent;
});

const decimalButton = document.querySelector("#decimal");
const clickDecimal = () => {
  if (isNextValue) {
    display.textContent = "0.";
    currentValue = display.textContent;
    isNextValue = false;
  } else {
      if (currentValue) {
      if (!currentValue.includes(DECIMAL_SIGN)) {
        display.textContent += DECIMAL_SIGN;
        currentValue = display.textContent;
      }
    } else {
      display.textContent = "0.";
      currentValue = display.textContent;
    }
  }
};
decimalButton.addEventListener("click", clickDecimal);