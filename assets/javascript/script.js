const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-add-btn');
const todoContainer = document.querySelector('.todo-container');

todoBtn.addEventListener('click', handleTodoInput)

document.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        handleTodoInput();
    }
});

function handleTodoInput() {
    const todoTitle = todoInput.value.trim();

    if (todoTitle !== "") {
        displayTodo(todoTitle);
        todoInput.value = null;
    }
}


function displayTodo(todo) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');
    todoContainer.appendChild(todoItem);

    const todoTitle = document.createElement('span');
    todoTitle.classList.add('todo-text');
    todoItem.appendChild(todoTitle);

    const todoActionBtns = document.createElement('div');
    todoActionBtns.classList.add('todo-action-btns');
    todoItem.appendChild(todoActionBtns);

    const todoDoneBtn = document.createElement('button');
    todoDoneBtn.classList.add('todo-done-btn');
    todoDoneBtn.textContent = "done";
    todoActionBtns.appendChild(todoDoneBtn);

    const todoRemoveBtn = document.createElement('button');
    todoRemoveBtn.classList.add('todo-remove-btn');
    todoRemoveBtn.textContent = "remove";
    todoActionBtns.appendChild(todoRemoveBtn);

    todoTitle.textContent = todo;

    todoDoneBtn.addEventListener('click', (e) => {
        todoTitle.style.textDecoration = (!todoTitle.style.textDecoration) ? "line-through" : "";
    })

    todoRemoveBtn.addEventListener('click', () => {
        todoItem.remove();
    })
}