const todoListTaskInput = document.querySelector(`.todo-task-input`);

function addTasktoList(todo) {
  const todoList = document.querySelector(`.todo-list`);
  const listItemEntry = document.createElement(`li`);
  listItemEntry.innerHTML = `<div class="list-item-row">
                                <input type="checkbox" class="task-completed-btn">
                                <p class="list-item-text">${todo}</p>
                            </div>
                            <button class="task-delete-btn"></button>`;
  listItemEntry.classList.add(`list-item-container`);
  todoList.insertAdjacentElement(`beforeend`, listItemEntry);
}

function handleTaskSubmit(event) {
  if (event.key === 'Enter') {
    const task = todoListTaskInput.value;
    todoListTaskInput.value = '';
    addTasktoList(task);
  }
}

window.addEventListener(`keydown`, handleTaskSubmit);
