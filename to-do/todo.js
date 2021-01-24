// LOCATING ELEMENTS
const taskElement = document.querySelector('input#task');
const taskSubmit = document.querySelector('input.add-task');
const clearTasks = document.querySelector('input#curr-task-submit');
const ulElement = document.querySelector('ul#todo-task');
const logoutElement = document.querySelector('button#logout')

// CALLING ini DOM function
localStorage.setItem('todo', 'Hello,FLAG');
ini();

// DECLEARING EVENT LISTENERS
taskSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    let value = taskElement.value;
    storeTask(value);
})

logoutElement.addEventListener('click', () => {
    localStorage.removeItem('login');
    window.location = 'login.html';
})

clearTasks.addEventListener('click', (e) => {
    // This will creat all the localStorage named todo
    const choice = confirm('Are You all done?');
    if (choice){
        localStorage.removeItem('todo');
    }
    e.preventDefault();
    ulElement.innerHTML = '';
})

ulElement.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.parentElement.className === 'item-remove'){
        let text = e.target.parentElement.parentElement.innerText;
        let tasks = localStorage.getItem('todo').split(',');
        let index = tasks.indexOf(text);
        tasks.splice(index, 1);
        // tasks = tasks.length > 0 ? tasks += ',' + value : value;
        localStorage.setItem('todo', tasks);
        // console.log(e.target.parentElement.parentElement);
        e.target.parentElement.parentElement.remove();
    }
})


// DECLEARING METHODS
function storeTask(value){
    let tasks = localStorage.getItem('todo');
    tasks = tasks === null ? tasks = '' : tasks;
    let tasksList = tasks.split(',');
    let valueLowerCase = value.toLowerCase();
    let submit = true;
    tasksList.forEach( (t) => {
        if (t.toLowerCase() === valueLowerCase){
            alert('This task is already added!');
            submit = false;
        }
    })
    if (submit){
        tasks = tasks.length > 0 ? tasks += ',' + value : value;
        localStorage.setItem('todo', tasks);
        createElements(value);
    }
}

function createElements(value){
    // CREATING ELEMENTS
    // ulElement.innerHTML = ''; // REMOVING ALL THE STUFF
    const iElement = document.createElement('i');
    iElement.className = 'fas fa-times item-remove-icon';
    const aElement = document.createElement('a');
    aElement.className = 'item-remove';
    const liElement = document.createElement('li');
    liElement.className = 'item';
    liElement.innerText = value;
    aElement.append(iElement);
    liElement.append(aElement);
    ulElement.append(liElement);
}

function ini(){
    let initailTasks = localStorage.getItem('todo');
// console.log(initailTasks);
    if (localStorage.getItem('login') === null){
        window.location = 'login.html'
    }
    if (initailTasks !== null) {
        initailTasks.split(',').forEach((task) => {
            createElements(task);
            // console.log(task);
        })
    }
}

