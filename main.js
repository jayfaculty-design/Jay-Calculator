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

  // capturing the numbers
  displayNum((clicked) => {
    currentNumber += clicked;
    displayScreen.value = currentNumber;
  });

  // capturing operator
  displayOperator((clicked) => {
    if (currentNumber) {
      // save the first number
      previousNumber = currentNumber;
      currentOperator = clicked; // capture the operator
      currentNumber = ""; // reset for the next number
    }
    displayScreen.value += `${clicked}`;
  });

  evaluateBtn.addEventListener("click", () => {
    if (currentOperator && previousNumber && currentNumber) {
      const num1 = parseFloat(previousNumber);
      const num2 = parseFloat(currentNumber);
      let result;

      switch (currentOperator) {
        case "+":
          result = num1 + num2;
          break;
        case "-":
          result = num1 - num2;
          break;
        case "×":
          result = num1 * num2;
          break;
        case "%":
          result = num1 % num2;
          break;
        case "÷":
          result = num2 !== 0 ? num1 / num2 : "Error";
          break;
        default:
          result = "Invalid Operation";
      }

      displayScreen.value = result;
      //reset them after displaying the result
      currentNumber = ""; //
      previousNumber = "";
      currentNumber = "";
    }
  });
}

calculate();

// Delete Button
deleteBtn.addEventListener("click", () => {
  const value = displayScreen.value;
  displayScreen.value = value.slice(0, -1);
});

//Reset button
resetScreen.addEventListener("click", () => {
  displayScreen.value = "";
});
