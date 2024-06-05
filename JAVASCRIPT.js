function generateCalendar(year, month) {
    const months = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
    const calendarTable = document.getElementById('calendar').getElementsByTagName('tbody')[0];
    calendarTable.innerHTML = '';
    
    // Vytvoření proměnných pro první a poslední den měsíce
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const numOfDays = lastDay.getDate();
    const startingDay = firstDay.getDay();
  
    // Aktualizace nadpisu kalendáře s názvem měsíce a rokem
    document.getElementById('currentMonth').textContent = months[month] + ' ' + year;
  
    // Generování buněk pro jednotlivé dny v kalendáři
    let day = 1;
    for (let j = 0; j < 6; j++) {
      const newRow = calendarTable.insertRow();
      for (let k = 0; k < 7; k++) {
        const newCell = newRow.insertCell();
        if (j === 0 && k < startingDay) {
          newCell.textContent = '';
        } else if (day <= numOfDays) {
          newCell.textContent = day++;
        }
      }
    }
  }
  
  let currentYear = 2024;
  let currentMonth = 0;
  
  // Funkce pro změnu aktuálního měsíce
  function changeMonth(delta) {
    currentMonth += delta;
    // Pokud jsme přešli na další rok, nebo naopak, aktualizujeme aktuální rok a měsíc
    if (currentMonth === 12) {
      currentMonth = 0;
      currentYear++;
    } else if (currentMonth === -1) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar(currentYear, currentMonth);
  }
  
  // Počáteční generování kalendáře pro aktuální rok a měsíc
  generateCalendar(currentYear, currentMonth);
  