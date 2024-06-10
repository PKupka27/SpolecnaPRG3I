let display = document.getElementById('display');

function clearDisplay() {
    display.textContent = '';
}

function deleteLast() {
    display.textContent = display.textContent.slice(0, -1);
}

function appendCharacter(char) {
    display.textContent += char;
}

function calculateResult() {
    try {
        display.textContent = eval(display.textContent);
    } catch {
        display.textContent = 'Error';
    }
}

// Funkce pro získání aktuálního času z API
async function fetchTime() {
    try {
        let response = await fetch('http://worldtimeapi.org/api/timezone/Europe/Prague');
        let data = await response.json();
        document.getElementById('time').textContent = `Aktuální čas: ${data.datetime}`;
    } catch (error) {
        document.getElementById('time').textContent = 'Nepodařilo se získat čas';
    }
}

// Volání funkce pro získání času při načtení stránky
fetchTime();
