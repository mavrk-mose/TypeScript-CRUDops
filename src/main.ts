import {v4 as uuidv4} from 'uuid';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
}

const list = document.querySelector<HTMLUListElement>('#list');
const input = document.querySelector<HTMLInputElement>('#new-todo');
const form = document.querySelector<HTMLFormElement>('#todo-form');
const todos: Todo[] = loadTodos()
todos.forEach(addListItem)

//adding an event listener to the form
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (input?.value == "" || input?.value == null) return

  const newTodo : Todo = {
    id: uuidv4(),
    text: input.value,
    completed: false,
    createdAt: new Date()
  } 
  todos.push(newTodo)
  saveTodos()
  addListItem(newTodo);
})

function addListItem(todo: Todo) {
    const item = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');

    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked
      saveTodos()
    })
    checkbox.type = "checkbox"
    checkbox.checked = todo.completed;

    label.append(checkbox, todo.text);
    item.append(label);
    list?.append(item); 
}

function saveTodos() {
  localStorage.setItem("TODOs", JSON.stringify(todos))
}

function loadTodos(): Todo[] {
  const taskJSON = localStorage.getItem("TODOs")
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}



