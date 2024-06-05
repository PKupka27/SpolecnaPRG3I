document.addEventListener('DOMContentLoaded', () => {
    fetchCurrentTime();
    generateCalendar();
});

function fetchCurrentTime() {
    fetch('http://worldtimeapi.org/api/timezone/Europe/Prague')
        .then(response => response.json())
        .then(data => {
            const currentTimeElement = document.getElementById('current-time');
            const dateTime = new Date(data.datetime);
            currentTimeElement.textContent = `Aktuální čas: ${dateTime.toLocaleTimeString('cs-CZ')}`;
        })
        .catch(error => console.error('Chyba při načítání času:', error));
}

function generateCalendar() {
    const calendarElement = document.getElementById('calendar');
    const daysOfWeek = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];

    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('header');
        dayElement.textContent = day;
        calendarElement.appendChild(dayElement);
    });

    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    let dayIndex = (firstDayOfMonth + 6) % 7;

    for (let i = 0; i < dayIndex; i++) {
        const emptyElement = document.createElement('div');
        calendarElement.appendChild(emptyElement);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        calendarElement.appendChild(dayElement);
    }
}
