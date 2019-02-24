// DOM variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners function
  function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove individual tasks event
    taskList.addEventListener('click', removeTask);
    // Clear all tasks event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
  }

// Get tasks from local storage
  function getTasks() {
    let tasks;
    // check if tasks exist in storage
    if(localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // loop through tasks that exist
    tasks.forEach(function(task) {
      // Create li element
      const li = document.createElement('li');
      // Give it a class name -- in materialize, ul's should be collections and li's collection items to make them look good
      li.className = 'collection-item';
      // Give li content- create a text node and append it to the DOM
      li.appendChild(document.createTextNode(task));     
      // Create a delete link element to remove tasks
      const deleteLink = document.createElement('a');
      // Give deleteLink a class using materialize
      deleteLink.className = 'delete-item secondary-content';
      // Add icon HTML
      deleteLink.innerHTML = '<i class= "fa fa-remove"></i>';
      // Append link to the li element
      li.appendChild(deleteLink);
      
      // Append li to ul 
      taskList.appendChild(li);     
    })
  }

// addTask function
  function addTask(e) {
    if(taskInput.value === '') {
      alert('Please add a task');
    }

    // Create li element
    const li = document.createElement('li');
    // Give it a class name -- in materialize, ul's should be collections and li's collection items to make them look good
    li.className = 'collection-item';
    // Give li content- create a text node and append it to the DOM
    li.appendChild(document.createTextNode(taskInput.value));     
    // Create a delete link element to remove tasks
    const deleteLink = document.createElement('a');
    // Give deleteLink a class using materialize
    deleteLink.className = 'delete-item secondary-content';
    // Add icon HTML
    deleteLink.innerHTML = '<i class= "fa fa-remove"></i>';
    // Append link to the li element
    li.appendChild(deleteLink);
    
    // Append li to ul 
    taskList.appendChild(li);

    // Store task in local storage
    storeTaskLocal(taskInput.value);
    
    // Clear input field
    taskInput.value = '';

    e.preventDefault();
  }

    // storeTaskLocal function
      function storeTaskLocal(task) {
        let tasks;
        // check if tasks exist in storage
        if(localStorage.getItem('tasks') === null) {
          tasks = [];
        } else {
          tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));
      }

// removeTask function
  function removeTask(e) {
    // Check if deleteLink icon is clicked
    if(e.target.parentElement.classList.contains('delete-item')) {
      // confirm the user wants to delete the task
      if(confirm('Are you sure?')) {
        // remove the entire li element, which is the grandparenbt element
        e.target.parentElement.parentElement.remove();

        // remove from local storage
        removeTaskLocal(e.target.parentElement.parentElement);
      }
    }
  }

      // removeTaskLocal function 
      function removeTaskLocal(taskItem) {
        let tasks;
        // check if tasks exist in storage
        if(localStorage.getItem('tasks') === null) {
          tasks = [];
        } else {
          tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        
        tasks.forEach(function(task, index) {
          if(taskItem.textContent === task) {
            tasks.splice(index, 1);
          }
        })

        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
  
// Clear all tasks
  function clearTasks() {
    // while there are still items in the list ...
    while(taskList.firstChild) {
      // remove first item in list
      taskList.removeChild(taskList.firstChild);
    }

    // Clear tasks from local storage
    clearTasksLocal();
  }

    // clearTasksLocal function
    function clearTasksLocal() {
      localStorage.clear();
      if(confirm('Are you sure?')) {
        localStorage.clear();
      }
    }

// Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  // 
  document.querySelectorAll('.collection-item').forEach
  (function(task) {
    const item = task.firstChild.textContent;
    if(item.indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  }); 
}

