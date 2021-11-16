import AddTaskForm from './AddTaskForm.js';
import { Task } from './Task.js';
import { List } from './List.js';

const addTaskForm = new AddTaskForm( onCreateTask );
const list = new List();

readFromLocalStorage();

function createTask(taskData) {
    const task = new Task(taskData);

    task.addEventListener('toggleCompleted', onTaskToggle);

    return task;
}

function onCreateTask(taskData) {
    list.addItem( createTask(taskData) );
    saveTasksToLocalStorage();
}

function onTaskToggle( e ) {
    const { target: task } = e;

    task.changeProps({
        completed: !task.data.completed
    });

    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    localStorage.tasks = JSON.stringify(list.items.map(t => t.data));
}

function readFromLocalStorage() {
    try {
        if (localStorage.tasks) {
            const parsedTasks = JSON.parse(localStorage.tasks);

            list.addItems( parsedTasks.map(d => createTask(d)) );
        }
    } catch (ex) {
        console.log('tasks wrong data');
    }
}
