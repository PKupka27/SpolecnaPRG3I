document.addEventListener('DOMContentLoaded', () => {
    const monthYear = document.getElementById('month-year');
    const dates = document.getElementById('dates');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    
    let currentDate = new Date();

    function renderCalendar(date) {
        dates.innerHTML = '';
        const month = date.getMonth();
        const year = date.getFullYear();
        monthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const startDay = (firstDay + 6) % 7;

        for (let i = 0; i < startDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'date';
            dates.appendChild(emptyDiv);
        }

        for (let day = 1; day <= lastDate; day++) {
            const dateDiv = document.createElement('div');
            dateDiv.className = 'date';
            dateDiv.textContent = day;
            dates.appendChild(dateDiv);
        }
    }

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);
});