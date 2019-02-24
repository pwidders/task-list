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
    // Remove individual tasks event
    taskList.addEventListener('click', removeTask);
    // Clear all tasks event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
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

// removeTask function
  function removeTask(e) {
    // Check if deleteLink icon is clicked
    if(e.target.parentElement.classList.contains('delete-item')) {
      // confirm the user wants to delete the task
      if(confirm('Are you sure?')) {
        // remove the entire li element, which is the grandparenbt element
        e.target.parentElement.parentElement.remove();
      }
    }
  }
  
// Clear all tasks
  function clearTasks() {
    // while there are still items in the list ...
    while(taskList.firstChild) {
      // remove first item in list
      taskList.removeChild(taskList.firstChild);
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

