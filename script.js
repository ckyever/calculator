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