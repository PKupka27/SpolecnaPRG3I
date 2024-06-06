window.onload = function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  addTaskBtn.addEventListener("click", addTask);

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      const listItem = document.createElement("li");

      const taskSpan = document.createElement("span");
      taskSpan.textContent = taskText;
      taskSpan.addEventListener("click", toggleTaskCompletion);

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Odebrat";
      removeBtn.className = "remove-btn";
      removeBtn.addEventListener("click", removeTask);

      listItem.appendChild(taskSpan);
      listItem.appendChild(removeBtn);
      taskList.appendChild(listItem);

      taskInput.value = "";
    }
  }

  function toggleTaskCompletion(event) {
    const listItem = event.target.parentElement;
    listItem.classList.toggle("completed");
  }

  function removeTask(event) {
    const listItem = event.target.parentElement;
    taskList.removeChild(listItem);
  }
};
