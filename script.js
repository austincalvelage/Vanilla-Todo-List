/* *******************************************************
 --------------- *** VARIABLES *** -----------------
 ******************************************************* */
// Grabbing items from DOM
const body = document.querySelector(`body`);
const taskInput = document.querySelector(`.task-input`);
const todoList = document.querySelector(`.todo-list`);
const tasksRemaining = document.querySelector(`.tasks-remaining`);
const listItems = document.querySelectorAll(`li`);

// creates empty array called tasks
let tasks = [];

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

// Takes in the argument of task from the handleInput function and injects a new list item into the DOM using insertAdjacentHTML
function addTaskToList(task) {
  todoList.insertAdjacentHTML(
    `afterbegin`,
    `<li class="list-item-container">
      <input type="checkbox" class="task-completed-btn checkbox" />
      <p class="list-item-text">${task}</p>
    <button class="task-delete-btn"></button>
  </li>`
  );
}

// Takes in a argument of either true or false
// runs filter method on the tasks array and stores the filtered out items that pass the condition into a new array
function filterList(status) {
  return tasks.filter(taskOb => taskOb.status === status);
}

// Checks if `Enter` key is pressed'
// Prevents default of enter key
// Passes the value of taskInput into CreateTaskObject that makes an object and passes into the array called tasks.
// Passes the argument of the taskInput into the addTaskToList Function
// Updates the taskInput to a empty string
// Checks if tasks that are completed are greater than 0 then subtract amount completed from total tasks and update tasks remaining
// If above statement is fasle Updates the task remaining text by grabbing the length of the array of tasks
function handleTaskInput(event) {
  if (event.key === `Enter`) {
    event.preventDefault();
    createTaskObject(taskInput.value);
    addTaskToList(taskInput.value);
    taskInput.value = ``;
    const completedTasks = filterList(true);
    if (completedTasks.length > 0) {
      return (tasksRemaining.innerHTML = `${tasks.length - completedTasks.length} Tasks Remaining`);
    }
    tasksRemaining.innerHTML = `${tasks.length} Tasks Remaining`;
  }
}

// Sort List Function for my event Listener on the Filter Buttons
// stores the paramenter passed (what your sorting by) inside local variable currentFilter
// stores the the current DOM element with the `filter-selected` class into a local variable called prevSelected
// Removes the `filter-selected` class from prevSelected and adds it to currentFilter
// grabs all checkboxes from the DOM
// Depending on condition adds and removes classes to hide items according to filter selected
function sortListBy(sortBy) {
  const currentFilter = document.querySelector(sortBy);
  const prevSelected = document.querySelector(`.filter-selected`);
  prevSelected.classList.remove(`filter-selected`);
  currentFilter.classList.add(`filter-selected`);
  const checkboxes = document.querySelectorAll(`.checkbox`);

  if (currentFilter.getAttribute(`id`) === `filterCompleteBtn`) {
    checkboxes.forEach(checkbox => {
      checkbox.parentElement.classList.remove(`hidden`);
      if (!checkbox.checked) {
        checkbox.parentElement.classList.add(`hidden`);
      }
    });
  }
  if (currentFilter.getAttribute(`id`) === `filterActiveBtn`) {
    checkboxes.forEach(checkbox => {
      checkbox.parentElement.classList.remove(`hidden`);
      if (checkbox.checked) {
        checkbox.parentElement.classList.add(`hidden`);
      }
    });
  }
  if (currentFilter.getAttribute(`id`) === `showAllBtn`) {
    checkboxes.forEach(checkbox => {
      checkbox.parentElement.classList.remove(`hidden`);
    });
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

    // filters through tasks and stores the array of objects with a status of true into an local variable called filterCheckedTasks
    const filterCheckedTasks = filterList(true);

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

  // checks for light/dark mode btn click
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
    const filterCompletedTasks = tasks.filter(taskOb => taskOb.status === false);
    const checkboxes = document.querySelectorAll(`[type="checkbox"]`);
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        checkbox.closest(`li`).remove();
      }
    });
    return (tasks = filterCompletedTasks);
  }

  // Checks if one of the filter buttons are clicked, calls the function sortListBy with sorting argument
  if (e.target.getAttribute(`id`) === `filterCompleteBtn`) {
    sortListBy(`#filterCompleteBtn`);
  }

  if (e.target.getAttribute(`id`) === `filterActiveBtn`) {
    sortListBy(`#filterActiveBtn`);
  }

  if (e.target.getAttribute(`id`) === `showAllBtn`) {
    sortListBy(`#showAllBtn`);
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
  tasksRemaining.innerHTML = `${tasks.length} Tasks Remaining`;
}
