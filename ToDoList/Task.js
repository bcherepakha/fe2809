import EventSource from './EventSource.js';

const DB_CLICK_TIME = 500;

function dbClick(fn, time) {
    let _lastCall = 0;

    return function (e) {
        const prevCall = _lastCall;

        _lastCall = Date.now();

        if (_lastCall - prevCall < time) {
            _lastCall = 0;

            return fn.call(this, e);
        }
    }
}

export class Task extends EventSource {
    constructor(taskData) {
        super();
        this.data = taskData;
        this.edit = false;
        this.createElement();
    }

    changeProps( newData ) {
        this.data = {
            ...this.data,
            ...newData
        };

        this.render();
    }

    createElement() {
        const rootEl = document.createElement('li');
        const viewEl = document.createElement('div');
        const editEl = document.createElement('form');

        const toggleCompletedEl = document.createElement('input');
        const taskTextEl = document.createElement('span');
        const destroyBtn = document.createElement('button');

        const editTextEl = document.createElement('input');
        const submitBtn = document.createElement('button');

        editTextEl.className = 'edit';
        editTextEl.value = this.data.text;

        submitBtn.className = 'visually-hidden';
        submitBtn.type = 'submit';
        submitBtn.innerText = 'Изменить';

        editEl.append(editTextEl, submitBtn);

        destroyBtn.className = 'destroy';

        toggleCompletedEl.className = 'toggle';
        toggleCompletedEl.type = 'checkbox';
        toggleCompletedEl.checked = this.data.completed;

        taskTextEl.innerText = this.data.text;

        viewEl.append(toggleCompletedEl, taskTextEl, destroyBtn);

        viewEl.className = 'view';
        rootEl.append(viewEl, editEl);

        if (this.data.completed) {
            rootEl.classList.add('completed');
        }

        toggleCompletedEl.addEventListener('change', this.toggleHandler.bind(this));
        destroyBtn.addEventListener('click', this.destroyHandler.bind(this));
        taskTextEl.addEventListener('click', dbClick(this.textClickHandler.bind(this), DB_CLICK_TIME));
        editEl.addEventListener('submit', this.changeText.bind(this));

        this.rootEl = rootEl;
        this.editTextEl = editTextEl;
        this.toggleCompletedEl = toggleCompletedEl;
        this.taskTextEl = taskTextEl;
    }

    setEditMode( mode ) {
        this.edit = mode;
        this.render();
    }

    textClickHandler() {
        this.edit = true;
        this.render();
    }

    destroy() {
        this.rootEl.remove();
    }

    destroyHandler() {
        this.dispatch('destroy');
    }

    toggleHandler(e) {
        this.dispatch('toggleCompleted');
    }

    changeText( e ) {
        e.preventDefault();

        this.dispatch('changetext', this.editTextEl.value );
    }

    render() {
        this.editTextEl.value = this.data.text;
        this.toggleCompletedEl.checked = this.data.completed;
        this.taskTextEl.innerText = this.data.text;

        if (this.data.completed) {
            this.rootEl.classList.add('completed');
        } else {
            this.rootEl.classList.remove('completed');
        }

        if (this.edit) {
            this.rootEl.classList.add('editing');
        } else {
            this.rootEl.classList.remove('editing');
        }

        return this.rootEl;
    }
}
