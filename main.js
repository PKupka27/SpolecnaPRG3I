document.addEventListener('DOMContentLoaded', () => {
    // Public Konstanty START //
    const addTaskButton = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const currentTimeDisplay = document.getElementById('current-time');
    const machineIp = document.getElementById('localmachine-ip');
    // Public Konstanty END //

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
});