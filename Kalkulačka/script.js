const calculator = document.getElementById('calculator');
const display = document.getElementById('display');
let currentOperation = null;
let previousOperand = '';
let currentOperand = '0';

function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updateDisplay() {
    display.innerText = currentOperand;
}

function clearDisplay() {
    currentOperand = '0';
    previousOperand = '';
    currentOperation = null;
    updateDisplay();
}

function appendNumber(number) {
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number.toString();
    } else {
        currentOperand += number.toString();
    }
    updateDisplay();
}

function chooseOperation(operation) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    currentOperation = operation;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    let computation;
    switch (currentOperation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation.toString();
    currentOperation = null;
    previousOperand = '';
    updateDisplay();
}

async function fetchRandomNumber() {
    try {
        const response = await fetch('https://csrng.net/csrng/csrng.php?min=0&max=100');
        const data = await response.json();
        const randomNumber = data[0].random;
        currentOperand = (parseFloat(currentOperand) + randomNumber).toString();
        updateDisplay();
    } catch (error) {
        console.error('Error fetching random number:', error);
    }
}

window.onload = () => {
    calculator.style.backgroundColor = randomColor();
}
