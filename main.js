const valueBtn = document.querySelectorAll(".value-btn");
const displayScreen = document.getElementById("display");
const evaluateBtn = document.getElementById("calculate-btn");
const resetScreen = document.getElementById("clear");
const operatorValue = document.querySelectorAll(".operator");
const deleteBtn = document.getElementById("delete-btn");

function buttonValue(value) {
  valueBtn.forEach((element) => {
    element.addEventListener("click", (e) => {
      const theValue = e.target.value;
      value(theValue);
    });
  });
}

function buttonOperator(operator) {
  operatorValue.forEach((element) => {
    element.addEventListener("click", (e) => {
      const ops = e.target.value;
      operator(ops);
    });
  });
}

function displayNum(callback) {
  buttonValue((clicked) => {
    callback(clicked);
  });
}
function displayOperator(callback) {
  buttonOperator((clicked) => {
    callback(clicked);
  });
}
function calculate() {
  let currentNumber = "";
  let currentOperator = "";
  let previousNumber = "";
  let result = null;

  // capturing the numbers
  displayNum((clicked) => {
    currentNumber += clicked;
    displayScreen.value = currentNumber;
  });

  // capturing operator
  displayOperator((clicked) => {
    if (currentNumber) {
      if (result === null) {
        result = parseFloat(currentNumber);
      } else if (currentOperator) {
        const num = parseFloat(currentNumber);
        switch (currentOperator) {
          case "+":
            result += num;
            break;
          case "-":
            result -= num;
            break;
          case "×":
            result *= num;
            break;
          case "%":
            result = result % num;
            break;
          case "÷":
            result = result / num;
            break;
          default:
            result = "Invalid Operation";
        }
      }
      currentOperator = clicked;
      currentNumber = "";
      displayScreen.value = `${result} ${currentOperator}`;
    }
  });

  evaluateBtn.addEventListener("click", () => {
    if (currentNumber && currentOperator) {
      const num = parseFloat(currentNumber);

      switch (currentOperator) {
        case "+":
          result += num;
          break;
        case "-":
          result -= num;
          break;
        case "×":
          result *= num;
          break;
        case "%":
          result %= num;
          break;
        case "÷":
          result = num !== 0 ? result / num : "Error";
          break;
        default:
          break;
      }

      displayScreen.value = result;
      //reset them after displaying the result
      currentNumber = "";
      currentOperator = "";
    }
  });

  resetScreen.addEventListener("click", () => {
    currentNumber = "";
    currentOperator = "";
    result = null;
    displayScreen.value = "";
  });
}

calculate();

// Delete Button
deleteBtn.addEventListener("click", () => {
  const value = displayScreen.value;
  displayScreen.value = value.slice(0, -1);
});
