import AddTaskForm from './AddTaskForm.js';
import { Task } from './Task.js';
import { List } from './List.js';
import { Counter } from './Counter.js';
import { Filter } from './Filter.js';
import { Server } from './server.js';

const addTaskForm = new AddTaskForm( onCreateTask, onServerInput );
const list = new List( isTaskShown );
const counter = new Counter();
const filter = new Filter();
const api = new Server();

filter.addEventListener('change', onFilterChange);

// readFromLocalStorage();

readFromServer();

function onFilterChange() {
    list.items.forEach(task => {
        task.setHidden( isTaskHidden( task ) );
    });

    list.render();
}

function isTaskShown( task ) {
    return !isTaskHidden( task );
}

function isTaskHidden( task ) {
    switch (filter.value) {
        case 'active':
            return task.data.completed;
        case 'completed':
            return !task.data.completed;
        default:
            return false;
    }
}

function createTask(taskData) {
    const task = new Task(taskData);

    task.setHidden( isTaskHidden( task ) );

    task.addEventListener('toggleCompleted', onTaskToggle);
    task.addEventListener('destroy', onDestroy);
    task.addEventListener('changetext', onChangeText);

    return task;
}

function onLocalInput(value) {
    list.items.forEach(task => {
        task.setHidden(
            !task.data.text
                .toLowerCase()
                .includes(
                    value.toLowerCase()
                    .trim()
                )
        );
    });
}

function onServerInput(value) {
    api.getTasks({ text: value })
        .then((parsedTask) => {
            if (addTaskForm.getTextValue() === value) {
                list.clear();
                list.addItems(parsedTask.map(createTask));
            }
        });
}

function onCreateTask(taskData) {
    addTaskForm.setDisabled(true);

    api.createTask( taskData )
        .then(data => {
            // list.addItem( createTask(data) );
            list.clear();
            return readFromServer();
        }).then(() => {
            // updateCounter();
            addTaskForm.setDisabled(false);
        });

    // saveTasksToLocalStorage();
}

function onChangeText( e ) {
    const { target: task, data } = e;

    api.updateTask({
        ...task.data,
        text: data
    }).then(data => {
        task.changeProps(data);
        task.setEditMode( false );
        updateCounter();
    }).catch(err => {
        task.render();
    });

    // saveTasksToLocalStorage();
}

async function onTaskToggle( e ) {
    const { target: task } = e;

    try {
        const data = await api.updateTask({
            ...task.data,
            completed: !task.data.completed
        });

        task.changeProps(data);
        updateCounter();
    } catch(err) {
        task.render();
    }

    // saveTasksToLocalStorage();
}

async function onDestroy( e ) {
    const { target: task } = e;

    await api.deleteTask( task.data.id );

    list.removeItem(task);
    updateCounter();

    // saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    localStorage.tasks = JSON.stringify(list.items.map(t => t.data));

    updateCounter();
}

function readFromLocalStorage() {
    try {
        if (localStorage.tasks) {
            const parsedTasks = JSON.parse(localStorage.tasks);

            list.addItems( parsedTasks.map(d => createTask(d)) );
            updateCounter();
        }
    } catch (ex) {
        console.log('tasks wrong data');
    }
}

function updateCounter() {
    counter.setItemsCount(
        list.items.length,
        list.items.filter(t => t.data.completed).length
    );
}

function readFromServer() {
    return api.getTasks()
        .then(parsedTasks => {

            list.addItems( parsedTasks.map(d => createTask(d)) );
            updateCounter();

        });
}
