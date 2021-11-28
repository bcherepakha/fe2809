import EventSource from './eventSource.js';

export class Cell extends EventSource {
    constructor( startValue, id ) {
        super();

        this.value = startValue;
        this.id = id;

        this.rowIdx = Math.floor( id / 9 );
        this.columnIdx = id % 9;

        this.squareIdx = Math.floor(this.columnIdx / 3) + 3*Math.floor(this.rowIdx / 3);

        this.editable = startValue === '.';
        this.error = false;
        this.active = false;
        this.activeRange = false;
        this.activeNumber = false;

        this.createElement();
    }

    changeProps(props) {
        for (const propName in props) {
            this[propName] = props[propName];
        }

        this.render();
    }

    createElement() {
        this.el = document.createElement('div');
        this.el.className = 'game__board-cell';

        if (this.editable) {
            this.el.setAttribute('tabindex', 0);
        }

        this.el.addEventListener('click', this.onActive);
        this.el.addEventListener('focus', this.onActive);

        this.render();
    }

    onActive = (e) => {
        this.dispatch('activate');
    }

    render() {
        if (this.value === '.') {
            this.el.innerText = '';
        } else {
            this.el.innerText = this.value;
        }

        this.el.dataset.editable = this.editable;
        this.el.dataset.error = this.error;
        this.el.dataset.activeCell = this.active;
        this.el.dataset.activeRange = this.activeRange;
        this.el.dataset.activeNumber = this.activeNumber;

        return this.el;
    }
}
