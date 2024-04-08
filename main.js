const todoListContent = document.querySelector(`.todoListContent`);
const todoList = document.querySelector('.todoList');
const btnDeleteVal = document.querySelector('#btnDeleteVal');
const inputTodo = document.querySelector(".inputTodo");
const addTodo = document.querySelector('.add-button');
const sort = document.querySelector('#sort');
const plusBtn = document.querySelector(".plusBtn");
let todos = [];
let f = true;
if (localStorage.getItem('todos')) {
    todos = JSON.parse(localStorage.getItem('todos'));
    todoUptate();
}

if (todoList.innerHTML.trim() === ``) {
    todoList.style.display = `none`;
}

function todoUptate() {
    todoList.innerHTML = '';
    todos.forEach((item, index) => {
        let elemLi = document.createElement("li");
        elemLi.innerText = item;
        todoList.appendChild(elemLi);
        inputTodo.value = ``;
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add('delete');
        deleteBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        elemLi.appendChild(deleteBtn);
        todoListContent.style.display = `block`;

        deleteBtn.addEventListener("click", function () {
            this.parentElement.remove();
            todos.splice(index, 1);
            saveTodosToLocalStorage();
            if (todos.length === 0) {
                todoListContent.style.display = `none`;
            }
        })
    })
}

function createTodo() {
    if (inputTodo.value.trim() !== ``) {
        todos.push(inputTodo.value.trim());
        saveTodosToLocalStorage();
        todoUptate();
    } else {
        alert("Please enter a task!");
        inputTodo.value = ``;
    }
};

function sortTodos() {
   f = !f; 
   todoList.innerHTML = ``;
   if (f) {
    todos.sort();
    sort.innerHTML = `<i class="fa-solid fa-arrow-down-short-wide"></i>`;
   }
    else{
        todos.sort().reverse();
        sort.innerHTML = `<i class="fa-solid fa-arrow-up-short-wide"></i>`;
    }
    todoUptate();
}

function saveTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

plusBtn.addEventListener('click', function () {
    inputTodo.focus();
});

btnDeleteVal.addEventListener('click', () => {
    inputTodo.value = ``;
});

sort.addEventListener('click', sortTodos);

addTodo.addEventListener("click", createTodo);

document.addEventListener('keyup', function (e) {
    if (e.key === `Enter`) {
        createTodo();
        inputTodo.blur();
    }
});
