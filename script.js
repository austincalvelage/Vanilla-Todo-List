// Grabs the todoListTaskInput  with a `todo-task-input` class from the DOM and stores them in a todoListTaskInput variable
const todoListTaskInput = document.querySelector(`.todo-task-input`);

// Grabs the todoList container with a `todo-list` class from the DOM and stores them in a todo-list variable
let todoList = document.querySelector(`.todo-list`);

// Grabs all buttons with  a `task-completed-btn` class from the DOM and stores them in a taskCompleteBtns variable
let taskCompleteBtns = document.querySelectorAll(`.task-completed-btn`);

// Grabs all buttons with  a `task-delete-btn` class from the DOM and stores them in a taskCompleteBtns variable
let taskDeleteBtns = document.querySelectorAll(`.task-delete-btn`);

// Callback function for the click of a taskCompleteBtn
// stores the event.currentTarget (button you clicked) within a button variable
// stores the nextElementSibling of the button you clicked into a taskTest variable
// When taskCompleteBtn clicked adds class of 'task-completed-checked' to the BTN and a class of 'complete' to the taskTest for styling
function completeTaskHandler(e) {
  const button = e.target;
  const taskText = button.nextElementSibling;
  button.classList.toggle(`task-completed-checked`);
  taskText.classList.toggle(`complete`);
}

// Callback function for the click of a deleteTaskBtn
// stores the event.currentTarget (button you clicked) within a button variable
// stores the closest (parent) list-item-container of the deleteTaskBtn into a taskItem variable
// Removes that list-item-container (todo task) from the list
function deleteTaskHandler(e) {
  const button = e.target;
  const taskItem = button.closest(`.list-item-container`);
  taskItem.remove();
}

// Updates the todoList variable after a new task is added.
// Updates the taskCompleteBtn variable after a new task is added.
// loops over the taskCompleteBtns again due to additional ones being added to page.
// loops over the taskDeleteBtns again due to additional ones being added to page.
function reloadList() {
  todoList = document.querySelector(`.todo-list`);
  taskCompleteBtns = document.querySelectorAll(`.task-completed-btn`);
  taskDeleteBtns = document.querySelectorAll(`.task-delete-btn`);

  taskCompleteBtns.forEach(buttons => {
    buttons.addEventListener(`click`, completeTaskHandler);
  });

  taskDeleteBtns.forEach(buttons => {
    buttons.addEventListener(`click`, deleteTaskHandler);
  });
}

// creates a new "li" element and stores it with in listItemEntry variable
// grabs the listItemEntry variable writes the inner HTML along with passing the TASK variable from  the handleTaskSubmit function
// Adds the `list-item-container CSS class to the listItemEntry
// Inserts the new Todo task before the end of the todoList
// calls the function reloadList
function addTaskToList(todo) {
  const listItemEntry = document.createElement(`li`);
  listItemEntry.innerHTML = `<div class="list-item-row">
                                <button class="task-completed-btn"></button>
                                <p class="list-item-text">${todo}</p>
                            </div>
                            <button class="task-delete-btn"></button>`;
  listItemEntry.classList.add(`list-item-container`);
  todoList.insertAdjacentElement(`beforeend`, listItemEntry);
  reloadList();
}

// Checks if `Enter` key is pressed on todoListTaskInput Element
// Stores the value of the todoListTaskInput within the variable task
// Updates the todoListTaskInput to an empty string so its ready for another task
// passes the task variable to the function addTaskToList
function handleTaskSubmit(event) {
  if (event.key === 'Enter') {
    const task = todoListTaskInput.value;
    todoListTaskInput.value = '';
    addTaskToList(task);
  }
}

// listens for `Enter` to be pressed on the todoListTaskInput and runs the handleTaskSubmit Function
todoListTaskInput.addEventListener(`keydown`, handleTaskSubmit);

// Loops over all taskCompleteBtns on the Page load and adds eventlistener to listen for click and calls completeTaskHandler function
taskCompleteBtns.forEach(buttons => {
  buttons.addEventListener(`click`, completeTaskHandler);
});

// Loops over all taskDeleteBtns on the Page load and adds eventlistener to listen for click and calls deleteTaskHandler function
taskDeleteBtns.forEach(buttons => {
  buttons.addEventListener(`click`, deleteTaskHandler);
});
