const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");
let todos = [];
const TODOS_KEY = "todos";

function saveTodos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function loadTodos(){
    const LoadedTodos = localStorage.getItem(TODOS_KEY);
    if(LoadedTodos !== null){
        const parsedTodos = JSON.parse(LoadedTodos);
        parsedTodos.forEach((item) => {
            paintTodo(item);
        });
    }
}
 
function paintTodo(newToDo){
    const li = document.createElement("li");
    li.id = newToDo.id;
    const span = document.createElement("span");
    span.innerText = newToDo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", onToDoDelete);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}
function onToDoDelete(event){
    const li = event.target.parentElement;
    todos = todos.filter((toDo) => toDo.id !== parseInt(li.id));
    li.remove();
    saveTodos();
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = {
        text: newToDo,
        id: Date.now(),
    };
    todos.push(newToDoObj);
    paintTodo(newToDoObj);
    saveTodos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if(savedTodos !== null){
    const parsedTodos = JSON.parse(savedTodos);
    todos = parsedTodos;
    parsedTodos.forEach(paintTodo);
}