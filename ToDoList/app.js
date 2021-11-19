import AddTaskForm from './AddTaskForm.js';
import { Task } from './Task.js';
import { List } from './List.js';
import { Counter } from './Counter.js';

const addTaskForm = new AddTaskForm( onCreateTask );
const list = new List();
const counter = new Counter();

readFromLocalStorage();

function createTask(taskData) {
    const task = new Task(taskData);

    task.addEventListener('toggleCompleted', onTaskToggle);
    task.addEventListener('destroy', onDestroy);
    task.addEventListener('changetext', onChangeText);

    return task;
}

function onCreateTask(taskData) {
    list.addItem( createTask(taskData) );
    saveTasksToLocalStorage();
}

function onChangeText( e ) {
    const { target: task, data } = e;

    task.changeProps({
        text: data
    });

    task.setEditMode( false );

    saveTasksToLocalStorage();
}

function onTaskToggle( e ) {
    const { target: task } = e;

    task.changeProps({
        completed: !task.data.completed
    });

    saveTasksToLocalStorage();
}

function onDestroy( e ) {
    const { target: task } = e;

    list.removeItem(task);

    saveTasksToLocalStorage();
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
