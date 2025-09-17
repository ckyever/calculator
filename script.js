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

  if (!isNaN(answer)) {
    answer = parseFloat(answer.toFixed(10));
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

const clickDigitButton = (event) => {
  const button = event.currentTarget;
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
};

const digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach((button) => {
  button.addEventListener("click", clickDigitButton);
});

const clickOperatorButton = (event) => {
  const button = event.currentTarget;
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
};

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
  button.addEventListener("click", clickOperatorButton);
});

function doEquals() {
  // If previous value is not a number (e.g. error message) then ignore the operation
  if (!isNaN(previousValue) && currentValue) {
    currentValue = operate(previousValue, currentValue, currentOperator);
    display.textContent = currentValue;
    previousValue = null;
    currentOperator = null;
  }
}

const equalsButton = document.querySelector("#equals");
const clickEqualsButton = () => {
  if (!isOperator(previousButtonPressed)) {
    doEquals()
  }
  previousValue = null;
  currentOperator = null;
  isNextValue = true;
  previousButtonPressed = equalsButton.textContent;
};
equalsButton.addEventListener("click", clickEqualsButton);

const clearButton = document.querySelector("#clear");
const clickClearButton = () => {
  previousValue = null;
  currentValue = null;
  display.textContent = null;
  currentOperator = null;
  previousButtonPressed = clearButton.textContent;
};
clearButton.addEventListener("click", clickClearButton);

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
  previousButtonPressed = decimalButton.textContent;
};
decimalButton.addEventListener("click", clickDecimal);

const deleteButton = document.querySelector("#delete");
const clickDelete = () => {
  currentValue = null;
  display.textContent = null;
  previousButtonPressed = deleteButton.textContent;
}
deleteButton.addEventListener("click", clickDelete);