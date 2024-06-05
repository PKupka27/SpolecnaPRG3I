// Globální proměnné pro aktuální měsíc a rok
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Inicializace kalendáře po načtení DOMu
document.addEventListener("DOMContentLoaded", function() {
    createCalendar(currentMonth, currentYear);
});

// Funkce pro vytvoření kalendáře pro zadaný měsíc a rok
function createCalendar(month, year) {
    const calendar = document.getElementById('calendar');
    const today = new Date();

    // Názvy měsíců
    const monthNames = [
        "Leden", "Únor", "Březen", "Duben", "Květen", "Červen",
        "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
    ];

    // Počet dní v měsíci
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Den v týdnu, kdy začíná měsíc
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Úprava indexu prvního dne (Po=1, Út=2, ..., Ne=0)
    const adjustedFirstDayIndex = (firstDayIndex === 0) ? 6 : firstDayIndex - 1;

    // Generování HTML pro kalendář
    let calendarHtml = `<h2>${monthNames[month]} ${year}</h2>`;
    calendarHtml += "<table>";
    calendarHtml += "<tr><th>Po</th><th>Út</th><th>St</th><th>Čt</th><th>Pá</th><th>So</th><th>Ne</th></tr>";

    let day = 1;
    for (let i = 0; i < 6; i++) {
        calendarHtml += "<tr>";
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < adjustedFirstDayIndex) {
                // Prázdné buňky před prvním dnem měsíce
                calendarHtml += "<td></td>";
            } else if (day > daysInMonth) {
                // Prázdné buňky po posledním dni měsíce
                calendarHtml += "<td></td>";
            } else {
                // Buňky s dny a textovými oblastmi pro poznámky
                calendarHtml += `<td>${day}<br><textarea id="note-${year}-${month + 1}-${day}"></textarea></td>`;
                day++;
            }
        }
        calendarHtml += "</tr>";
    }

    calendarHtml += "</table>";
    calendar.innerHTML = calendarHtml;
}

// Funkce pro změnu měsíce
function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    createCalendar(currentMonth, currentYear);
}

// Funkce pro získání aktuálního času z API
function getCurrentTime() {
    fetch('http://worldtimeapi.org/api/timezone/Europe/Prague')
        .then(response => response.json())
        .then(data => {
            const currentTime = new Date(data.datetime);
            document.getElementById('currentTime').innerText = `Aktuální čas: ${currentTime.toLocaleTimeString()}`;
        })
        .catch(error => {
            console.error('Chyba při získávání času:', error);
            document.getElementById('currentTime').innerText = 'Nepodařilo se získat aktuální čas.';
        });
}

// Funkce pro uložení obsahu kalendáře do textového souboru
function savePage() {
    let textContent = "Kalendář\n\n";
    const calendar = document.getElementById('calendar');
    // Odstranění HTML značek a úprava obsahu pro textový formát
    textContent += calendar.innerHTML.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

    // Vytvoření Blob objektu a odkazu pro stažení souboru
    const blob = new Blob([textContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'kalendar.txt';
    link.click();
}
