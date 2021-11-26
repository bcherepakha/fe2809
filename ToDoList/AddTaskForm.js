const INPUT_TIME = 300;

function throtle(fn, time) {
    let timerID = null;

    return function() {
        if (timerID) {
            clearTimeout(timerID);
        }

        timerID = setTimeout(() => {
            timerID = null;

            return fn.apply(this, arguments);
        }, time);
    }
}

export default class AddTaskForm {
    constructor( onCreateTask, onInput ) {
        this.rootEl = document.querySelector('.header');
        this.completeEl = this.rootEl.querySelector('.complete-all');
        this.taskEl = this.rootEl.elements.task;
        this.onCreateTask = onCreateTask;
        this.onInput = onInput;
        this.inputTimoutID = null;
        // this.searchHandler = this.searchHandler.bind(this);
        //? this.__proto__ = AddTaskForm.prototype

        this.rootEl.addEventListener('submit', this.createTask.bind(this));
        this.taskEl.addEventListener('input', this.searchHandler);
    }

    searchHandler = throtle(() => {
        this.onInput(this.taskEl.value);
    }, INPUT_TIME)

    getTextValue() {
        return this.taskEl.value;
    }

    createTask(e) {
        console.log('create Task');
        e.preventDefault();

        const task = {
            completed: this.completeEl.checked,
            text: this.taskEl.value
        };

        this.taskEl.value = '';

        if (this.onCreateTask) {
            this.onCreateTask(task);
        }
    }

    setDisabled( disabled ) {
        if ( disabled ) {
            this.rootEl.classList.add('disabled');
        } else {
            this.rootEl.classList.remove('disabled');
        }
    }
}
