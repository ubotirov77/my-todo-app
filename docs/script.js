const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const emptyMessage = document.getElementById("emptyMessage");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
renderTodos();

addBtn.addEventListener("click", addTodo);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

function addTodo() {
  const text = input.value.trim();
  if (text === "") return;

  const todo = { text, completed: false };
  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
  input.value = "";
}

function renderTodos() {
  todoList.innerHTML = "";

  if (todos.length === 0) {
    emptyMessage.style.display = "block";
    return;
  } else {
    emptyMessage.style.display = "none";
  }

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    li.innerHTML = `
      <span class="todo-text ${todo.completed ? "completed" : ""}">
        ${todo.text}
      </span>

      <div class="buttons">
        <button class="btn" onclick="toggleTodo(${index})">✔</button>
        <button class="btn" onclick="deleteTodo(${index})">✖</button>
      </div>
    `;

    todoList.appendChild(li);
  });
}

function toggleTodo(i) {
  todos[i].completed = !todos[i].completed;
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

function deleteTodo(i) {
  todos.splice(i, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}
