import EventSource from './eventSource.js';

export class Keyboard extends EventSource {
    constructor() {
        super();

        this.rootEl = document.querySelector('.game__keyboard');

        this.rootEl.addEventListener('submit', this.onSubmit.bind(this));
    }

    setActive( keys = '123456789' ) {
        Array.prototype.forEach.call(this.rootEl.elements, (btn) => {
            btn.disabled = !keys.includes(btn.value);
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const { submitter: { value } } = e;

        this.dispatch('click', value);
    }
}
