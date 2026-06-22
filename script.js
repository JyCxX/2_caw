const taskInput = document.getElementById('taskInput');
const taskPriority = document.getElementById('taskPriority');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    
    // Organiza para as tarefas de prioridade Alta aparecerem primeiro
    const sortedTasks = [...tasks].sort((a, b) => {
        const order = { 'alta': 1, 'media': 2, 'baixa': 3 };
        return order[a.priority] - order[b.priority];
    });

    sortedTasks.forEach((task) => {
        const originalIndex = tasks.indexOf(task); 
        
        const card = document.createElement('div');
        card.classList.add('task-card');
        card.classList.add(`prioridade-${task.priority}`);
        if(task.completed) card.classList.add('completed');

        let priorityLabel = task.priority === 'media' ? 'Média' : task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

        card.innerHTML = `
            <div class="task-header">
                <span class="task-title">${task.text}</span>
                <span class="badge">${priorityLabel}</span>
            </div>
            <div class="task-actions">
                <button class="btn-icon btn-check" onclick="toggleTask(${originalIndex})">Concluir</button>
                <button class="btn-icon btn-delete" onclick="deleteTask(${originalIndex})">Excluir</button>
            </div>
        `;
        taskList.appendChild(card);
    });
}

function addTask() {
    const text = taskInput.value.trim();
    const priority = taskPriority.value;

    if (text !== '') {
        tasks.push({ text: text, completed: false, priority: priority });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        renderTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
});

// Renderiza tudo ao carregar
renderTasks();
