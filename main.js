const todoListContent = document.querySelector(`.todoListContent`);
const todoList = document.querySelector('.todoList');
const btnDeleteVal = document.getElementById('btnDeleteVal');
const inputTodo = document.querySelector(".inputTodo");
const addTodo = document.querySelector('.add-button');
const sort = document.querySelector('#sort');
let todos = [];
if (todoList.innerHTML.trim() === ``) {
    todoListContent.style.display = `none`;
}
function render() {
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
            if (todos.length === 0) {
                todoListContent.style.display = `none`;
            }
        })
    })
}

function createTodo() {
    if (inputTodo.value.trim() !== ``) {
        todoList.innerHTML = '';
        todos.push(inputTodo.value.trim());
        render();
    }
    else {
        alert("Please enter a task!");
        inputTodo.value = ``;
    }
};
function sortTodos() {
    todoList.innerHTML = ``;
    todos.sort();
    render();
}
sort.addEventListener('click', sortTodos)
addTodo.addEventListener("click", createTodo);
document.addEventListener('keyup', function (e) {
    if (e.key === `Enter`) {
        createTodo()
    }
});