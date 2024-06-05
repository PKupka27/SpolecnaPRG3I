class Calendar {
    constructor(elementId) {
        
        this.element = document.getElementById(elementId);                              //Inicializace elementu kalendáře a data
        this.currentDate = new Date();
        this.selectedDate = null;
        
        this.initControls();                        //Načtení ovládacích prvků a přidání událostí
        this.render();
    }

    
    initControls() {
        document.getElementById('prev-month').addEventListener('click', () => this.changeMonth(-1));
        document.getElementById('next-month').addEventListener('click', () => this.changeMonth(1));                             //inicializace ovládacích prvků
    }

    
    changeMonth(offset) {
        this.currentDate.setMonth(this.currentDate.getMonth() + offset);                                        //změna měsíce
        this.render();
    }

    
    render() {                                          //vykreslení kalendáře
        this.element.innerHTML = '';
        
        document.getElementById('month-year').innerText = this.currentDate.toLocaleString('cs-CZ', { month: 'long', year: 'numeric' });
        const daysInMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            dayElement.innerText = i;
            dayElement.addEventListener('click', () => this.selectDate(i));                            //Nastavení názvu měsíce a roku
            if (this.isSelectedDate(i)) {
                dayElement.classList.add('selected');
            }
            this.element.appendChild(dayElement);
        }
    }

    
    selectDate(day) {
        this.selectedDate = { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth(), day: day };                                         //výběr dne
        this.render();
    }

    
    isSelectedDate(day) {
        return this.selectedDate &&
               this.selectedDate.year === this.currentDate.getFullYear() &&                                                        //kontrola, zda je den vybraný
               this.selectedDate.month === this.currentDate.getMonth() &&
               this.selectedDate.day === day;
    }
}


document.addEventListener('DOMContentLoaded', () => {                                       //Inicializace kalendáře po načtení DOM
    new Calendar('calendar');
});