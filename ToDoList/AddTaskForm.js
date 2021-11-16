export default class AddTaskForm {
    constructor( onCreateTask ) {
        this.rootEl = document.querySelector('.header');
        this.completeEl = this.rootEl.querySelector('.complete-all');
        this.taskEl = this.rootEl.elements.task;
        this.onCreateTask = onCreateTask;

        this.rootEl.addEventListener('submit', this.createTask.bind(this));
    }

    createTask(e) {
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
}
