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
    // Add task event
    form.addEventListener('submit', addTask);
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
    
    // Clear input field
    taskInput.value = '';

    e.preventDefault();
  }