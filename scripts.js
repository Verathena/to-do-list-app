// Get references to the input form and list elements
const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

// Load existing to-dos from local storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Remove any undefined to-dos
todos = todos.filter(todo => todo !== undefined);

// Render the to-do list
render();

// Add event listener to the form to handle new to-do submissions
form.addEventListener('submit', event => {
  event.preventDefault(); // prevent form submission from reloading the page

  // Get the user's input and trim any whitespace
  const text = input.value.trim();

  // Make sure the input is not empty
  if (text.length === 0) {
    alert('Please enter a to-do item!');
    return;
  }

  // Add the new to-do to the list
  todos.unshift({ text, completed: false, timestamp: Date.now() });

  // Save the updated list to local storage
  localStorage.setItem('todos', JSON.stringify(todos));

  // Clear the input field and re-render the list
  input.value = '';
  render();
});

// Add event listener to the list to handle to-do completion and deletion
list.addEventListener('click', event => {
  const target = event.target;

  // Handle completion of a to-do item
  if (target.matches('.todo-text')) {
    const index = Number(target.dataset.index);
    todos[index].completed = !todos[index].completed;
    localStorage.setItem('todos', JSON.stringify(todos));
    render();
  }

  // Handle deletion of a to-do item
  if (target.matches('.delete-button')) {
    const index = Number(target.dataset.index);
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    render();
  }
});

// Render the to-do list
function render() {
  // Clear the existing list
  list.innerHTML = '';

  // Sort the to-dos by the order in which they were added (most recent first)
  todos.sort((a, b) => b.timestamp - a.timestamp);

  // Add each to-do item to the list
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="todo-text" data-index="${index}">${todo.text}</span>
      <button class="delete-button" data-index="${index}">Delete</button>
    `;
    list.appendChild(li);
  });
}
