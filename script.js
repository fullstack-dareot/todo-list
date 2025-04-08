document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const priorityInput = document.getElementById("priorityInput");
    const notesInput = document.getElementById("notesInput");
    const estimatedTimeInput = document.getElementById("estimatedTimeInput");
    const taskTypeInput = document.getElementById("taskTypeInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const saveTasks = () => localStorage.setItem("tasks", JSON.stringify(tasks));

    const renderTasks = () => {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex flex-column text-white bg-dark border-light mb-2 p-3";
            li.innerHTML = `
                <strong>${task.text}</strong>
                <small>Prioridad: ${task.priority} | Tipo: ${task.type} | Tiempo estimado: ${task.estimatedTime} min</small>
                <small>Notas: ${task.notes}</small>
                <button class="btn btn-danger btn-sm mt-2" onclick="removeTask(${index})">Eliminar</button>
            `;
            taskList.appendChild(li);
        });
    };

    addTaskBtn.addEventListener("click", () => {
        if (taskInput.value.trim() !== "") {
            const newTask = {
                id: Date.now(),
                text: taskInput.value.trim(),
                date: new Date().toLocaleString(),
                priority: priorityInput.value,
                type: taskTypeInput.value,
                notes: notesInput.value.trim(),
                estimatedTime: estimatedTimeInput.value.trim(),
                completed: false,
                subtasks: []
            };
            tasks.push(newTask);
            taskInput.value = "";
            notesInput.value = "";
            estimatedTimeInput.value = "";
            saveTasks();
            renderTasks();
        }
    });

    window.removeTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    renderTasks();
});