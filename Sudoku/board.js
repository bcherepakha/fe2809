import { Cell } from "./cell.js";

export class Board {
    constructor() {
        this.rootEl = document.querySelector('.game__board');
        this.startBoard = new Array(81).fill('.').join('');

        this.start();
    }

    activateCell = (e) => {
        this.activeCell = e.target;
        this.render();
    }

    clear() {
        this.rootEl.innerText = '';
    }

    start() {
        this.clear();

        this.activeCell = null;

        this.cells = this.startBoard
            .split('')
            .map(this.createCell, this);

        this.rootEl.append(
            ...this.cells.map(cell => cell.render())
        );
    }

    createCell(value, idx) {
        const cell = new Cell(value, idx);

        cell.addEventListener('activate', this.activateCell);

        return cell;
    }

    setValue( boardStr ) {
        this.startBoard = boardStr;

        this.start();
    }

    render() {
        const { activeCell } = this;

        this.cells.forEach(cell => {
            cell.changeProps({
                active: activeCell === cell,
                activeRange: activeCell
                    ? cell.rowIdx === activeCell.rowIdx
                        || cell.columnIdx === activeCell.columnIdx
                        || cell.squareIdx === activeCell.squareIdx
                    : false,
                activeNumber: !!activeCell
                    && activeCell.value !== '.'
                    && cell.value === activeCell.value,
            });
        });

        return this.rootEl;
    }
}
