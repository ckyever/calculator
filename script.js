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
const MULTIPLY_OPERATOR = '*';
const DIVIDE_OPERATOR = '/';
const EQUALS_SIGN = '=';
const CLEAR_SIGN = 'C';
const DELETE_SIGN = 'DEL';
const DECIMAL_SIGN = '.';

const OPERATOR_CHECK = ADD_OPERATOR + SUBTRACT_OPERATOR + MULTIPLY_OPERATOR + DIVIDE_OPERATOR;
function isOperator(check) {
  return OPERATOR_CHECK.includes(check);
}

const ZERO_DIVISION_MESSAGE = "Don't do that!"

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

const MAX_DISPLAY_LENGTH = 12;
const display = document.querySelector("output");

const clickDigitButton = (digit) => {
  if (!isNextValue && String(currentValue).length >= MAX_DISPLAY_LENGTH) {
    return;
  }
  if (currentValue === "0" && !isNextValue) {
    // Can't add numbers after 0
    return;
  }
  if (isNextValue) {
    display.textContent = digit;
    isNextValue = false;
  } else {
    display.textContent += digit;
  }
  currentValue = display.textContent;
  previousButtonPressed = digit;
};

const digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    clickDigitButton(event.currentTarget.textContent);
  });
});

const clickOperatorButton = (operator) => {
  if (isOperator(previousButtonPressed)) {
    currentOperator = operator;
    return;
  }
  if (previousValue && currentValue) {
    // Evaluate the previous pair of values first
    doEquals();
  }
  previousValue = currentValue;
  currentOperator = operator;
  isNextValue = true;
  previousButtonPressed = operator;
};

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    clickOperatorButton(event.currentTarget.textContent);
  });
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

const clickEqualsButton = () => {
  if (previousValue == null) {
    return
  }
  if (!isOperator(previousButtonPressed)) {
    doEquals()
  }
  previousValue = null;
  currentOperator = null;
  isNextValue = true;
  previousButtonPressed = EQUALS_SIGN;
};
const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", clickEqualsButton);

const clearButton = document.querySelector("#clear");
const clickClearButton = () => {
  previousValue = null;
  currentValue = null;
  display.textContent = null;
  currentOperator = null;
  previousButtonPressed = CLEAR_SIGN;
};
clearButton.addEventListener("click", clickClearButton);

const clickDecimalButton = () => {
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
  previousButtonPressed = DECIMAL_SIGN;
};
const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", clickDecimalButton);

const clickDeleteButton = () => {
  currentValue = null;
  display.textContent = null;
  previousButtonPressed = DELETE_SIGN;
}
const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", clickDeleteButton);

// Keyboard support
const handleKeyboard = (event) => {
  switch (event.key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      clickDigitButton(event.key);
      break;

    case ADD_OPERATOR:
    case SUBTRACT_OPERATOR:
    case MULTIPLY_OPERATOR:
    case DIVIDE_OPERATOR:
      clickOperatorButton(event.key);
      break;

    case DECIMAL_SIGN:
      clickDecimalButton();
      break;

    case EQUALS_SIGN:
    case "Enter":
      clickEqualsButton();
      break;

    case "c":
    case "C":
      clickClearButton();
      break;

    case "Backspace":
    case "Delete":
      clickDeleteButton();
      break;
  }
};
document.addEventListener("keydown", handleKeyboard);