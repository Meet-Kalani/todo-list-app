// DOM elements
const todoInputElement = document.querySelector(".todo-input");
const addTodoBtnElement = document.querySelector(".todo-add-btn");
const todoContainerElement = document.querySelector(".todo-container");

let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
let currentTodo = {};
let todoId = 0;

// Display locally stored todo's
document.addEventListener("DOMContentLoaded", () => {
  savedTodos.forEach((savedTodo) => {
    createTodo(savedTodo);
  });
});

// Event listener for triggering processing of user input on "+" button click
addTodoBtnElement.addEventListener("click", addTodoItem);

// Event listener for triggering processing of user input on "Enter" key press
todoInputElement.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTodoItem();
  }
});

function addTodoItem() {
  const todoText = todoInputElement.value.trim();

  if (todoText !== "") {
    const savedTodo = saveToLocalStorage(todoText);
    createTodo(savedTodo);

    // changing savedTodos variable to reflect locally stored todos
    savedTodos = JSON.parse(localStorage.getItem("todos"));
    todoInputElement.value = "";
  }
}

function createTodo(todo) {
  const todoItem = createHTMLElement(todoContainerElement, "div", "todo-item");
  const todoText = createHTMLElement(todoItem, "span", "todo-text");
  const todoDone = createHTMLElement(todoItem, "input", "todo-done");
  todoDone.type = "checkbox";
  todoDone.name = "todo-done";
  // changing checkbox state to reflect locally stored value
  if (todo.isDone) {
    todoDone.checked = true;
    todoText.style.textDecoration = "line-through";
  }
  todoItem.insertBefore(todoDone, todoItem.firstChild);
  const todoRemoveBtn = createHTMLElement(todoItem, "button", "remove-btn");
  todoRemoveBtn.textContent = "Remove";

  todoText.textContent = todo.text;

  // Done todo functionality
  todoDone.addEventListener("change", () => {
    todoText.style.textDecoration = todoDone.checked ? "line-through" : "";

    const todoToUpdate = savedTodos.find(
      (savedTodo) => savedTodo.id === todo.id
    );

    if (todoToUpdate) {
      todoToUpdate.isDone = todoDone.checked;
    }

    localStorage.setItem("todos", JSON.stringify(savedTodos));
  });

  // Remove todo functionality
  todoRemoveBtn.addEventListener("click", () => {
    savedTodos = savedTodos.filter((savedTodo) => savedTodo.id !== todo.id);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    todoItem.remove();
  });
}

function saveToLocalStorage(todo) {
  currentTodo = {
    id: ++todoId,
    text: todo,
    isDone: false,
  };

  savedTodos.push(currentTodo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));

  return currentTodo;
}

function createHTMLElement(parentElement, elementName, className) {
  const element = document.createElement(elementName);
  element.classList.add(className);
  parentElement.appendChild(element);
  return element;
}
