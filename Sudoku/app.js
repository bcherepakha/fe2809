import { sudoku, DIFFICULTY } from './sudoku.core.js';
import { Settings } from './settings.js';
import { Board } from './board.js';

const settings = new Settings( DIFFICULTY );
const board = new Board();

settings.addEventListener('submit', onStartGame);

console.log( board );

function onStartGame() {
    board.setValue( sudoku.generate(settings.complexity ) );
}
