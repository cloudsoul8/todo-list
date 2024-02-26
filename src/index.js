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
    const delIndex = group.groupList.findIndex((title, description) => {
        return title === delTitle, description === delDescription
    })
    group.groupList.splice(delIndex, 1)
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
            todoListDiv.appendChild(loadTodos(todo))
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

function loadTodos(todo) {
    const todoItem = document.createElement("div")
    todoItem.classList.add("todo-item")

    todoItem.append(Object.assign(document.createElement('p'),{classList:"", innerText:todo.title}))
    todoItem.append(Object.assign(document.createElement('p'),{classList:"", innerText:todo.description}))
    todoItem.append(Object.assign(document.createElement('p'),{classList:"", innerText:todo.dueDate}))
    todoItem.append(Object.assign(document.createElement('p'),{classList:"", innerText:todo.priority}))
    todoItem.append(Object.assign(document.createElement('p'),{classList:"", innerText:todo.isComplete}))

    // add button to delete (probably similar to library)

    return todoItem
}

// index.js
// initialization, change to json
let group1 = new TodoGroup("project1", "this is a cool project")
let group2 = new TodoGroup("project2", "this is a cool project, too")
let todoListMain= [group1, group2]
addTodo(group1, "yeah", "desc", "some date1", "high")
addTodo(group1, "yeah", "desc", "some date2", "high")
addTodo(group1, "yeah", "desc", "some date3", "high")
addTodo(group2, "yeah", "desc", "some date4", "high")
addTodo(group2, "yeah", "desc", "some date5", "high")


// dom manip
const todoGroupDiv = document.getElementById("todo-group")
const todoListDiv = document.getElementById("todo-list")
todoListMain.forEach((group) => {
    todoGroupDiv.appendChild(loadTodoGroup(group))
})


