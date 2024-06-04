document.addEventListener('DOMContentLoaded', () => {
    // Public Konstanty START //
    const addTaskButton = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const currentTimeDisplay = document.getElementById('current-time');
    const machineIp = document.getElementById('localmachine-ip');
    // Public Konstanty END //

    loadTasks(); // Načte úkoly, které byly dříve zadány a uloženy do LocalStorage.
    fetchCurrentTime(); // Requestne 'http://worldtimeapi.org/api/timezone/Europe/Prague' o JSON. Vlastně zavolá API
    setInterval(fetchCurrentTime, 1000); // Toto volání slouží jako 'loop', který stále odesílá každých 1000ms požadavek o nový JSON request pro obnovu hodin.

    addTaskButton.addEventListener('click', () => { // Při kliknutí zavolá 'addTask' která zavolá 'saveTasks' která uloží data z pole taskText do LocalStorage.
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            newTaskInput.value = '';
        }
    });

    newTaskInput.addEventListener('keypress', (event) => { // Spuštění události 'uložení' pomocí !KLÁVESNICE!. Zde Enter. 
        if (event.key === 'Enter') {
            const taskText = newTaskInput.value.trim();
            if (taskText !== '') {
                addTask(taskText);
                newTaskInput.value = '';
            }
        }
    });

    function addTask(taskText) {
        const taskItem = document.createElement('li'); // Element <li> = pod sebe. <ul> by bylo vedle sebe.
        taskItem.textContent = taskText;

        const deleteButton = document.createElement('button'); // Konstanta pro delbutton.
        deleteButton.textContent = 'Smazat'; // Nastaví text na 'Smazat'
        deleteButton.addEventListener('click', () => {
            taskItem.remove(); // Smaže item (úkol) definovanou pod taskItem
            saveTasks();
        });

        taskItem.appendChild(deleteButton); // Připne potomka 'DELETE' k taskItem.
        taskList.appendChild(taskItem); // Připne potomka k taskList.

        saveTasks(); // Zavolá saveTasks().
    }

    function saveTasks() {
        const tasks = []; // Definuje seznam
        taskList.querySelectorAll('li').forEach(taskItem => { // Nastaví pro každý vložený item <li>
            tasks.push(taskItem.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Uloží itemy do LocalStorage.
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Načte itemy (úkoly) z LocalStorage.
        tasks.forEach(taskText => {
            addTask(taskText);
        });
    }

    function fetchCurrentTime() { // Funkce pro získání api času a IPv4 nebo IPv6 lokálního stroje (Počítače).
        fetch('http://worldtimeapi.org/api/timezone/Europe/Prague') // Adresa pro API ve formátu JSON. Konkrétně volá Prahu.
            .then(response => response.json()) // Převod JSONu do JS objektu
            .then(data => { // Definuje pro konstanty data fetchnutá z 'API'.
                currentTimeDisplay.textContent = `Aktuální čas: ${new Date(data.datetime).toLocaleString()}`; // Vypsání času z 'datetime' pomocí Date() + převod z formátu DD-MM-DD-YYYY HH-MM-SS GMT+2 na DD-MM-YY HH-MM-SS.
                machineIp.textContent = `IP: ${data.client_ip}`; // Vypsání IP z 'client_ip'.
            })
            .catch(error => {
                console.error('Chyba při načítání API:', error); // Chxba
                currentTimeDisplay.textContent = 'Nelze načíst aktuální čas.'; // Chyba
                machineIp.textContent = 'Nelze načíst IP.'; // Chyba
            });
    }
});