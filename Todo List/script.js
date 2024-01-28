const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editTodo = null;

const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("Write something to add in todo");
    return false;
  }

  if (addBtn.value === "Edit") {
    editTodo.target.previousElementSibling.innerHTML = inputText;
    editLocalTodos(inputText);
    addBtn.value = "Add";
    inputBox.value = " ";
  } else {
    // creating a todo
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    // creating a edit button
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "edit");
    li.appendChild(editBtn);

    // creating a delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("btn", "del");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = " ";
    saveLocalTodos(inputText);
  }
};

const updateTodo = (e) => {
  if (e.target.innerHTML === "Remove") {
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement);
  }
  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "Edit";
    editTodo = e;
  }
};

const saveLocalTodos = (todo) => {
  let todos;
  const storedTodos = localStorage.getItem("todos");

  try {
    todos = storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.error("Error parsing JSON:", error);
    todos = [];
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const viewLocalTodos = () => {
  let todos;
  const storedTodos = localStorage.getItem("todos");

  if (storedTodos === null) {
    todos = [];
  } else {
    try {
      todos = JSON.parse(storedTodos);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      todos = [];
    }

    todos.forEach((todo) => {
      // creating a todo
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);

      // creating an edit button
      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.classList.add("btn", "edit");
      li.appendChild(editBtn);

      // creating a delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Remove";
      deleteBtn.classList.add("btn", "del");
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
    });
  }
};

const deleteLocalTodos = (todo) => {
  let todos;
  const storedTodos = localStorage.getItem("todos");

  if (storedTodos === null) {
    todos = [];
  } else {
    try {
      todos = JSON.parse(storedTodos);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      todos = [];
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex,1);
    localStorage.setItem("todos",JSON.stringify(todos));
  }

};


const editLocalTodos = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todoIndex = todos.indexOf(todo);
  todos[todoIndex] = inputBox.value;
  localStorage.setItem("todos",JSON.stringify(todos));
};

document.addEventListener("DOMContentLoaded", viewLocalTodos);
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
