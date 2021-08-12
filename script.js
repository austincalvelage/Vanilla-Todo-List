/* *******************************************************
 --------------- *** VARIABLES *** -----------------
 ******************************************************* */
const body = document.querySelector(`body`);
const taskInput = document.querySelector(`.task-input`);
const todoList = document.querySelector(`.todo-list`);
let tasks = [];
const tasksRemaining = document.querySelector(`.tasks-remaining`);
const listItems = document.querySelectorAll(`li`);

/* *******************************************************
 --------------- *** FUNCTIONS *** -----------------
 ******************************************************* */
// Creates a Task object and stores it with the array of tasks. The object has a task property and a status (default = false) property.
// adds to beginning of array to match DOM list with unshift
function createTaskObject(taskItem, isComplete = false) {
  const taskObj = {
    task: taskItem,
    status: isComplete,
  };
  tasks.unshift(taskObj);
}

// Takes in the argument of task from the handleInput function and injects a new list item into the DOM
function addTaskToList(task) {
  todoList.insertAdjacentHTML(
    `afterbegin`,
    `<li class="list-item-container d--f fd--r jc--sb ai--c">
    <div class="list-item-row d--f fd--r ai--c">
      <input type="checkbox" class="task-completed-btn" />
      <p class="list-item-text">${task}</p>
    </div>
    <button class="task-delete-btn"></button>
  </li>`
  );
}

// Checks if `Enter` key is pressed'
// Prevents default of enter key
// Passes the value of taskInput into CreateTaskObject that makes an object and passes into the array called tasks.
// Passes the argument of the taskInput into the addTaskToList Function
// Updates the taskInput to a empty string
// Updates the task remaining text by grabbing the length of the array of tasks
function handleTaskInput(event) {
  if (event.key === `Enter`) {
    event.preventDefault();
    createTaskObject(taskInput.value);
    addTaskToList(taskInput.value);
    taskInput.value = ``;
    tasksRemaining.innerHTML = `${tasks.length} Tasks Remaining`;
  }
}

// Click Handler callback
function handleTaskClick(e) {
  // checks for a taskCompleteBtn click
  // stores the event.currentTarget (button you clicked) within a button variable
  // stores the nextElementSibling of the button you clicked into a taskTest variable
  // When taskCompleteBtn clicked adds class of 'task-completed-checked' to the BTN and a class of 'complete' to the taskTest for styling
  if (e.target.classList.contains(`task-completed-btn`)) {
    const button = e.target;
    const taskText = button.nextElementSibling;
    button.classList.toggle(`task-completed-checked`);
    taskText.classList.toggle(`complete`);

    // stores the task object that matches the taskText of the checkbox checked allowing me to access the status property on my object stored in the array.
    const checkedTask = tasks.find(taskOb => taskOb.task.trim() === taskText.textContent);

    // if checked sets task status to true
    // if unchecked sets task status to false
    if (e.target.checked) {
      checkedTask.status = true;
    }
    if (!e.target.checked) {
      checkedTask.status = false;
    }

    // filters through tasks and stores objects with a status of true into an array called filterCheckedTasks
    const filterCheckedTasks = tasks.filter(taskOb => taskOb.status === true);

    // Updates the tasksRemaining element by subtracting "completed aka checked" tasks from total.
    tasksRemaining.innerHTML = `${tasks.length - filterCheckedTasks.length} Tasks Remaining`;
  }

  // checks for a delete btn click
  // stores the event targets closest list item into a variable called taskText and pulls its textContent out uses trim to get rid of white space.
  // stores the task object that matches the taskText of the deleteBtn clicked allowing me remove that object from the array
  // removes that index of deleteTask from the tasks array via splice
  // removes element from DOM and updates TaskRemaining text
  if (e.target.classList.contains(`task-delete-btn`)) {
    const taskText = e.target.closest(`li`).textContent.trim();
    const deleteTask = tasks.find(taskOb => taskOb.task === taskText);
    tasks.splice(tasks.indexOf(deleteTask), 1);
    e.target.parentElement.remove();
    tasksRemaining.innerHTML = `${tasks.length} Tasks Remaining`;
  }

  // creates a local variable called body and stores the body from the DOM within
  // Grabs the darkModeBtn with a `dark-mode-btn` class from the DOM and stores them in a local darkModeBtn variable
  // Grabs the lightModeBtn with a `light-mode-btn` class from the DOM and stores them in a local lightkModeBtn variable
  // toggles hidden class on both darkModeBtn and lightModeBtn (on/off)
  // toggles the class `light and toggles the class `dark` on the body (on/off)
  if (e.target.classList.contains(`theme-toggle-btn`)) {
    const darkModeBtn = document.querySelector(`.dark-mode-btn`);
    const lightModeBtn = document.querySelector(`.light-mode-btn`);
    darkModeBtn.classList.toggle(`hidden`);
    lightModeBtn.classList.toggle(`hidden`);
    body.classList.toggle(`light`);
    body.classList.toggle(`dark`);
  }

  // Checks for clear-completed btn click
  // creates local variable FilterCompleted stores an array of objects that aren't checked (status property of false)
  // creates local variable called checkboxes loops over them, checks if they checked property is true if so removes closest li which is its parent element.
  // updates task variable to equal Filter completed. (objects with status property of false)
  if (e.target.classList.contains(`clear-completed`)) {
    const FilterCompletedTasks = tasks.filter(taskOb => taskOb.status === false);
    const checkboxes = document.querySelectorAll(`[type="checkbox"]`);
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        checkbox.closest(`li`).remove();
      }
    });
    return (tasks = FilterCompletedTasks);
  }

  if (e.target.getAttribute(`id`) === `filterCompleteBtn`) {
    const filterComplete = document.querySelector(`#filterCompleteBtn`);
    const prevSelected = document.querySelector(`.filter-selected`);
    prevSelected.classList.remove(`filter-selected`);
    filterComplete.classList.add(`filter-selected`);
    const checkboxes = document.querySelectorAll(`[type="checkbox"]`);
    checkboxes.forEach(checkbox => {
      checkbox.closest(`li`).classList.remove(`hidden`);
      if (!checkbox.checked) {
        checkbox.closest(`li`).classList.add(`hidden`);
      }
    });
  }

  if (e.target.getAttribute(`id`) === `filterActiveBtn`) {
    const filterActive = document.querySelector(`#filterActiveBtn`);
    const prevSelected = document.querySelector(`.filter-selected`);
    prevSelected.classList.remove(`filter-selected`);
    filterActive.classList.add(`filter-selected`);
    const checkboxes = document.querySelectorAll(`[type="checkbox"]`);
    checkboxes.forEach(checkbox => {
      checkbox.closest(`li`).classList.remove(`hidden`);
      if (checkbox.checked) {
        checkbox.closest(`li`).classList.add(`hidden`);
      }
    });
  }
  if (e.target.getAttribute(`id`) === `showAllBtn`) {
    const showAll = document.querySelector(`#showAllBtn`);
    const prevSelected = document.querySelector(`.filter-selected`);
    prevSelected.classList.remove(`filter-selected`);
    showAll.classList.add(`filter-selected`);
    const checkboxes = document.querySelectorAll(`[type="checkbox"]`);
    checkboxes.forEach(checkbox => {
      checkbox.closest(`li`).classList.remove(`hidden`);
    });
  }
}

/* *******************************************************
 --------------- *** EVENT LISTENERS *** -----------------
 ******************************************************* */

// listens for `Enter` to be pressed on the todoListTaskInput and runs the handleTaskSubmit Function
taskInput.addEventListener(`keydown`, handleTaskInput);

// Listens for a click on body rather than specific elements due to needing to use Event Delegation
body.addEventListener(`click`, handleTaskClick);

// if listItems exist on page at load contructs and object the has the properies of task and status then pushes the object into the tasks array.
if (listItems) {
  listItems.forEach(listItem => {
    createTaskObject(listItem.innerText);
  });
  tasks.reverse(); // matches order of DOM list
}

// Displays items remaining in tasks array onto page at load
tasksRemaining.innerHTML = `${tasks.length} Tasks Remaining`;
