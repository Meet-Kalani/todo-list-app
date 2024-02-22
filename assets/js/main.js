// DOM elements
const todoInputElement = document.querySelector('.todo-input');
const todoBtnElement = document.querySelector('.todo-add-btn');
const todoContainerElement = document.querySelector('.todo-container');

// Event listeners for triggering processing of user input 
todoBtnElement.addEventListener('click', addTodoItem)
todoInputElement.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        addTodoItem();
    }
});

function addTodoItem() {
    const todoTitle = todoInputElement.value.trim();

    if (todoTitle !== "") {
        createTodo(todoTitle);
        todoInputElement.value = '';
    }
}

function createTodo(todo) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');
    todoContainerElement.appendChild(todoItem);

    const todoTitle = document.createElement('span');
    todoTitle.classList.add('todo-text');
    todoItem.appendChild(todoTitle);

    const todoActionBtns = document.createElement('div');
    todoActionBtns.classList.add('todo-action-btns');
    todoItem.appendChild(todoActionBtns);

    const todoDoneBtn = document.createElement('img');
    todoDoneBtn.src = "assets/media/done-icon.png"
    todoActionBtns.appendChild(todoDoneBtn);

    const todoRemoveBtn = document.createElement('img');
    todoRemoveBtn.src = "assets/media/remove-icon.png"
    todoActionBtns.appendChild(todoRemoveBtn);

    todoTitle.textContent = todo;
    let isDone = false;

    todoDoneBtn.addEventListener('click', (e) => {
        todoTitle.style.textDecoration = (!todoTitle.style.textDecoration) ? "line-through" : "";

        todoDoneBtn.src = isDone ? "assets/media/done-icon.png" : "assets/media/done-icon-blue.png";
        isDone = !isDone;
    })

    todoRemoveBtn.addEventListener('click', () => {
        todoItem.remove();
    })
}