document.addEventListener('DOMContentLoaded', () => {
    const calendarBody = document.getElementById('calendar-body');
    const currentMonthYear = document.getElementById('current-month-year');
    const currentDate = new Date(); // Vytvoření objektu pro aktuální datum

    // Funkce pro získání aktuálního času z API
    function fetchCurrentTime() {
        fetch('http://worldtimeapi.org/api/timezone/Europe/Prague')
            .then(response => response.json()) // Převedení odpovědi na JSON
            .then(data => {
                const date = new Date(data.datetime); // Vytvoření objektu pro datum z API
                displayCalendar(date); // Zobrazení kalendáře pro daný datum
            })
            .catch(error => {
                console.error('Error fetching time:', error);
                displayCalendar(currentDate); // Pokud je chyba, zobrazit kalendář pro aktuální datum
            });
    }

    // Funkce pro zobrazení kalendáře
    function displayCalendar(date) {
        const month = date.getMonth(); // Získání aktuálního měsíce
        const year = date.getFullYear(); // Získání aktuálního roku
        const firstDay = new Date(year, month, 1).getDay(); // První den měsíce
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Počet dní v měsíci

        // Nastavení textu pro aktuální měsíc a rok
        currentMonthYear.textContent = `${date.toLocaleString('cs-CZ', { month: 'long' })} ${year}`;

        // Vyčištění těla tabulky
        calendarBody.innerHTML = '';
        let dateCounter = 1;
        let row = document.createElement('tr'); // Vytvoření řádku tabulky

        // Vyplnění prvního týdne kalendáře
        for (let i = 0; i < 7; i++) {
            if (i < firstDay) {
                row.appendChild(document.createElement('td')); // Prázdné buňky před prvním dnem
            } else {
                let cell = document.createElement('td'); // Vytvoření buňky tabulky
                cell.textContent = dateCounter; // Nastavení textu buňky na aktuální den
                row.appendChild(cell);
                dateCounter++;
            }
        }

        calendarBody.appendChild(row); // Přidání řádku do těla tabulky

        // Vyplnění zbývajících dní měsíce
        while (dateCounter <= daysInMonth) {
            row = document.createElement('tr'); // Vytvoření nového řádku tabulky
            for (let i = 0; i < 7; i++) {
                if (dateCounter > daysInMonth) {
                    break; // Pokud je konec měsíce, ukončení cyklu
                }
                let cell = document.createElement('td'); // Vytvoření buňky tabulky
                cell.textContent = dateCounter; // Nastavení textu buňky na aktuální den
                row.appendChild(cell);
                dateCounter++;
            }
            calendarBody.appendChild(row); // Přidání řádku do těla tabulky
        }
    }

    fetchCurrentTime(); // Volání funkce pro získání aktuálního času
});