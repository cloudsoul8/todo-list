// logic.js
class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title
        this.description = description 
        this.dueDate = dueDate
        this.priority = priority
        this.isComplete = false
    }
}

class TodoGroup {
    constructor(groupName, groupDescription) {
        this.groupName = groupName
        this.groupDescription = groupDescription
        this.groupList = []
    }
}

function addTodo(group, title, description, dueDate, priority) {
    const newTodo = new Todo(title, description, dueDate, priority)
    group.groupList.push(newTodo)
}

function deleteTodo(group, delTitle, delDescription) {
    const delIndex = group.groupList.findIndex(
        todo => todo.title === delTitle && todo.description == delDescription 
    )
    if (delIndex != -1)
        group.groupList.splice(delIndex, 1)
}

function changeTodo(todo) {
    todo.isComplete = !todo.isComplete
}


// json.js
// initialization, change to json
let todoListMain = []
function loadTodoJSON() {
    if (localStorage.getItem("todoListMain") === null) {
        let defaultGroup = new TodoGroup("default", "this is the default group")
        addTodo(defaultGroup, "Welcome!", "Hello there!", "some date1", "high")
        addTodo(defaultGroup, "Welcome!", "Hello there, too!", "some date1", "high")
        todoListMain = [defaultGroup]
        console.log("No localStorage file found. Placed defaults.")
    } else {
        todoListMain = JSON.parse(localStorage.todoListMain)
        console.log("Loaded localStorage.")
    }
}

function saveTodoJSON() {
    localStorage.setItem("todoListMain", JSON.stringify(todoListMain))
}


// dom.js
function loadTodoGroup(group) {
    const groupItem = document.createElement("div")
    groupItem.classList.add("group-item")
    groupItem.append(Object.assign(document.createElement('p'),{classList:"", innerText:group.groupName}))

    groupItem.addEventListener("click", ()=>{
        // chaange todo header
        loadTodoHeader(group)

        // change todo items
        document.getElementById("todo-list").innerText = ""
        group.groupList.forEach((todo) => {
            todoListDiv.appendChild(loadTodos(group, todo))
        })
    })
    return groupItem
}

function loadTodoHeader(group) {
    const todoHeader = document.getElementById("todo-header")
    todoHeader.innerText = ""
    todoHeader.append(Object.assign(document.createElement('h2'),{classList:"", innerText:group.groupName}))
    todoHeader.append(Object.assign(document.createElement('h2'),{classList:"", innerText:group.groupDescription}))
}

function loadTodos(group, todo) {
    const todoItem = document.createElement("div")
    todoItem.classList.add("todo-item")

    todoItem.append(Object.assign(document.createElement('p'),{classList:"", innerText:todo.title}))
    todoItem.append(Object.assign(document.createElement('p'),{classList:"", innerText:todo.description}))
    todoItem.append(Object.assign(document.createElement('p'),{classList:"", innerText:todo.dueDate}))
    todoItem.append(Object.assign(document.createElement('p'),{classList:"", innerText:todo.priority}))
    todoItem.append(Object.assign(document.createElement('p'),{classList:"", innerText:todo.isComplete}))

    // add button to delete (probably similar to library)
    const deleteBtn = document.createElement("button")
    deleteBtn.setAttribute("class", 'delete-btn')
    deleteBtn.addEventListener("click", event => {
        deleteTodo(group, todo.title, todo.description)
        saveTodoJSON()
    })
    todoItem.appendChild(deleteBtn)
    return todoItem
}

function loadTodoGroupDropdown() {

}



// index.js
loadTodoJSON()


// dom manip
const todoGroupDiv = document.getElementById("todo-group")


const todoListDiv = document.getElementById("todo-list")
todoListMain.forEach((group) => {
    todoGroupDiv.appendChild(loadTodoGroup(group))
})

const addTodoBtn = document.getElementById("add-todo-btn")
addTodoBtn.addEventListener("click", event => {
    
})
const addTodoConfirm = document.getElementById("add-todo-confirm")
addTodoConfirm.addEventListener("click", event => {
    const title = document.getElementById("add-todo-title").value;
    const description = document.getElementById("add-todo-desc").value;
    const dueDate = document.getElementById("add-todo-date").value;
    const priority = document.getElementById("add-todo-priority").value;
    const group = todoListMain[todoListMain.findIndex(group => group.groupName === document.getElementById("add-todo-group").value)]
    addTodo(group, title, description, dueDate, priority);
    saveTodoJSON();
})
const addGroupConfirm = document.getElementById("add-group-confirm")
addGroupConfirm.addEventListener("click", event => {
    const title = document.getElementById("add-group-title").value;
    const description = document.getElementById("add-group-desc").value;
    todoListMain.push(new TodoGroup(title, description))
    saveTodoJSON();
    console.log(1)
})
