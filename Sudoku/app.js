import { sudoku, DIFFICULTY } from './sudoku.core.js';
import { Settings } from './settings.js';
import { Board } from './board.js';
import { Keyboard } from './keyboard.js';
import Modal from './modal.js';

const settings = new Settings( DIFFICULTY );
const board = new Board();
const keyboard = new Keyboard();

settings.addEventListener('submit', onStartGame);
keyboard.addEventListener('click', onKeyPress);
board.addEventListener('activate-cell', onActivateCell);
board.addEventListener('board-change', onActivateCell);

console.log( board );

loadLocalBoard();

function loadLocalBoard() {
    if (localStorage.boardStr && sudoku.validate_board(localStorage.boardStr) === true) {
        const { boardStr, boardErrors } = localStorage;

        board.setValue( boardStr );

        if (localStorage.boardErrors && localStorage.boardErrors.length === 81) {
            board.setErrors( boardErrors );
        }

        keyboard.setActive();
    }
}

function saveBoardInfo() {
    localStorage.boardStr = board.getBoard();
    localStorage.boardErrors = board.getErrors();
}

function onStartGame() {
    const modal = new Modal('Хотите начать новую игру?');

    modal
        .action('Yes', { ok: true }, () => {
            const boardStr = sudoku.generate( settings.complexity );

            board.setValue( boardStr );
            keyboard.setActive();

            saveBoardInfo();

            modal.hide();
        })
        .action('No', { cancel: true })
        .show();

    console.log('modal', modal);
}

function onKeyPress(e) {
    board.pushKey( e.data );
}

function onActivateCell() {
    const candidates = board.getCurrentCellCandidates();

    if (candidates) {
        keyboard.setActive( candidates );
    }

    saveBoardInfo();
}

document.addEventListener('keyup', function (e) {
    if (e.which == 8) {
        // NOTE: backspace pushed
        board.pushKey( 'clear' );
    }
});

document.addEventListener('keypress', function (e) {
    if ( !isNaN( parseInt(e.key, 10) ) ) {
        board.pushKey( e.key );
    }
});
