import { Cell } from './cell.js';
import { sudoku } from './sudoku.core.js';
import EventSource from './eventSource.js';

export class Board extends EventSource {
    static BTN_CLEAR = 'clear';
    static BTN_HELP = 'help';

    constructor() {
        super();

        this.rootEl = document.querySelector('.game__board');
        this.startBoard = new Array(81).fill('.').join('');

        this.start();
        this.updateCandidates();
    }

    getErrors() {
        return this.cells && this.cells.map(cell => {
            if (cell.error) {
                return cell.value;
            }

            return '.';
        }).join('');
    }

    getBoard( activeCellExpectedValue ) {
        return this.cells && this.cells.map(cell => {
            if (cell.editable && cell === this.activeCell && activeCellExpectedValue) {
                return activeCellExpectedValue;
            }

            if (cell.error) {
                return '.';
            }

            return cell.value;
        }).join('');
    }

    activateCell = (e) => {
        this.activeCell = e.target;
        this.render();

        this.updateCandidates();

        this.dispatch('activate-cell');
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
        this.updateCandidates();
        this.dispatch('board-change');
    }

    setErrors( errors ) {
        errors.split('').forEach((error, id) => {
            if (error !== '.') {
                this.cells[id].changeProps({
                    value: error,
                    error: true
                });
            }
        });

        this.dispatch('board-change');
    }

    getCurrentCellCandidates() {
        if (!this.activeCell || !this.boardCandidates) {
            return false;
        }

        const { rowIdx, columnIdx } = this.activeCell;

        return this.boardCandidates[rowIdx][columnIdx];
    }

    pushKey( number ) {
        if (this.activeCell && this.activeCell.editable) {
            if (number === Board.BTN_CLEAR) {
                this.activeCell.changeProps({
                    value: '.',
                    error: false
                });
            } else if (number === Board.BTN_HELP) {
                const cellCandidates = this.getCurrentCellCandidates();
                let randomCandidate;

                do {
                    randomCandidate = cellCandidates[ Math.floor(Math.random() * cellCandidates.length) ];
                } while( !sudoku.solve( this.getBoard( randomCandidate ) ) );

                this.activeCell.changeProps({
                    value: randomCandidate,
                    error: false
                });
            } else {
                const cellCandidates = this.getCurrentCellCandidates();
                let hasError = !cellCandidates || !cellCandidates.includes(number);

                try {
                    if (!hasError && !sudoku.solve( this.getBoard( number ) )) {
                        hasError = true;
                    }
                } catch (ex) {
                    console.log( ex.message );
                }

                this.activeCell.changeProps({
                    value: number,
                    error: hasError
                });
            }

            this.updateCandidates();
            this.render();
            this.dispatch('board-change');
        }
    }

    updateCandidates() {
        const boardCandidates = sudoku.get_candidates( this.getBoard( '.' ) );

        this.boardCandidates = boardCandidates;
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
