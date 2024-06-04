// funkce pro ziskani aktualniho casu pomocí API
function getCurrentTime() {
    fetch('https://worldtimeapi.org/api/ip')
        .then(response => response.json())
        .then(data => {
            const dateTime = new Date(data.datetime);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
            const formattedDateTime = dateTime.toLocaleString('cs-CZ', options);
            document.querySelector('.month').textContent = formattedDateTime;
        })
        .catch(error => {
            console.error('Chyba při získávání aktuálního času:', error);
        });
}

// funkce pro vytvoreni kalendare
function createCalendar() {
    const daysElement = document.querySelector('.days');
    const currentDate = new Date();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const monthDays = document.createDocumentFragment();

    for (let i = 0; i < firstDayIndex; i++) {
        const dayElement = document.createElement('div');
        monthDays.appendChild(dayElement);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = i;
        dayElement.setAttribute('data-day', i);
        dayElement.addEventListener('click', displayNotes);
        monthDays.appendChild(dayElement);
    }

    daysElement.innerHTML = '';
    daysElement.appendChild(monthDays);
}

// funkce pro zobrazeni poznamek pro vybrany den
function displayNotes(event) {
    const selectedDay = event.target.getAttribute('data-day');
    const allDays = document.querySelectorAll('.days div');
    allDays.forEach(day => {
        day.classList.remove('selected');
    });
    event.target.classList.add('selected');
    const noteInput = document.getElementById('noteInput');
    const savedNote = localStorage.getItem(`note_${selectedDay}`);
    noteInput.value = savedNote ? savedNote : '';
}

// funkce pro ulozeni poznamky pro vybrany den
function saveNote() {
    const selectedDay = document.querySelector('.days div[data-day].selected');
    if (!selectedDay) {
        alert('Nejprve vyberte den v kalendáři.');
        return;
    }
    const noteInput = document.getElementById('noteInput');
    const day = selectedDay.getAttribute('data-day');
    localStorage.setItem(`note_${day}`, noteInput.value);
    alert('Poznámka uložena.');
}
//tato funkce spusti aplikaci jakmile je HTML pripravene
document.addEventListener('DOMContentLoaded', function() {
    getCurrentTime();
    createCalendar();
});
