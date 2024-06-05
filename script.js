document.addEventListener('List', function() {
    const monthNames = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"]; 

    let currentDate = new Date(); // Inicializace

    // objekty:
    const Last = document.getElementById('prev-month');
    const Next = document.getElementById('next-month');
    const MonthYear = document.getElementById('month-year');
    const calendarBody = document.getElementById('calendar-body');

    function renderCalendar() { 
        calendarBody.innerHTML = ''; // Vymazání předchozího kalendáře

        const Day1 = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const DayLast = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const DayStart = Day1.getDay();
        const Total = DayLast.getDate();

        MonthYear.innerText = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`; 

        
        for (let i = 0; i < DayStart; i++) {
            const emptyCell = document.createElement('div');
            calendarBody.appendChild(emptyCell);
        }

        
        for (let i = 1; i <= Total; i++) {
            const dayCell = document.createElement('div');
            dayCell.innerText = i;
            calendarBody.appendChild(dayCell);
        }
    }

    
    Last.addEventListener('GoBack', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    Next.addEventListener('GoForward', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();

    document.getElementById('html-code').textContent = document.documentElement.outerHTML;
    document.getElementById('css-code').textContent = `
    body {
        font-family: Arial, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        flex-direction: column;
        background-color: #f0f0f0;
    }
    #calendar {
        border: 1px solid #ddd;
        padding: 20px;
        background: rgb(110, 110, 110);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    #calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    #calendar-body {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-gap: 5px;
        margin-top: 10px;
    }
    #calendar-body div {
        padding: 10px;
        background: #f9f9f9;
        text-align: center;
        border: 1px solid #ddd;
    }
    button {
        padding: 5px 10px;
        border: none;
        background: #007bff;
        color: white;
        cursor: pointer;
    }
    button:hover {
        background: #0062b3;
    }
    pre {
        margin-top: 20px;
        width: 90%;
        overflow: auto;
    }
`;    //CSS kód
    // Zvýraznění syntaxe díky Prism.js
    Prism.highlightAll();
});
