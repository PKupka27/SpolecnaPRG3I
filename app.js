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