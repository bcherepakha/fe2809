const X = 'x';
const O = '0';
const EMPTY = ' ';

const game = {
    board: [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]
    ],
    currentUser: X,
    userBoardAction( e ) {
        // const cellEl = e.target.closest('.cross__board-item');
        const cellEl = e.currentTarget;
        const rowIndex = game.cells.findIndex(function (rowItems) {
            return rowItems.includes(cellEl);
        });
        const cellIndex = game.cells[rowIndex].findIndex(function (cell) {
            return cell === cellEl;
        });

        game.step(rowIndex, cellIndex);
    },
    step(rowIndex, cellIndex) {
        if (game.board[rowIndex][cellIndex] !== EMPTY) {
            return false;
        }

        const currentUser = game.currentUser;

        game.board[rowIndex][cellIndex] = currentUser;
        game.currentUser = currentUser === X ? O : X;

        // if ( currentUser === X ) {
        //     game.currentUser = O;
        // } else {
        //     game.currentUser = X;
        // }

        game.fillCell(rowIndex, cellIndex, currentUser);
    },
    create0() {
        const svgRoot = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const ellipseEl = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');

        svgRoot.setAttribute('class', 'o cross__board-item-el');
        svgRoot.setAttribute('viewBox', '0 0 80 80');

        svgRoot.append(ellipseEl);

        ellipseEl.setAttribute('cx', '40');
        ellipseEl.setAttribute('cy', '40');
        ellipseEl.setAttribute('rx', '20');
        ellipseEl.setAttribute('ry', '30');

        return svgRoot;
    },
    crateX() {
        const svgRoot = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        svgRoot.setAttribute('class', 'x cross__board-item-el');
        svgRoot.setAttribute('viewBox', '0 0 80 80');

        line2.setAttribute('class', 'x__line2');
        line2.setAttribute('x1', '60');
        line2.setAttribute('y1', '10');
        line2.setAttribute('x2', '20');
        line2.setAttribute('y2', '70');

        line1.setAttribute('class', 'x__line1');
        line1.setAttribute('x1', '20');
        line1.setAttribute('y1', '10');
        line1.setAttribute('x2', '60');
        line1.setAttribute('y2', '70');

        svgRoot.append(line1, line2);

        return svgRoot;
    },
    init() {
        const boardEl = document.querySelector('.cross__board');

        game.boardEl = boardEl;
        game.boardRows = boardEl.querySelectorAll('.cross__board--row');
        game.cells = [];

        for (let i=0; i < game.boardRows.length; i++) {
            const rowItems = game.getRowCells(game.boardRows[i]);

            game.cells.push( rowItems );

            rowItems.forEach(function (cell, cellIndex) {
                cell.addEventListener('click', game.userBoardAction);
            });
        }

        // boardEl.addEventListener('click', game.userBoardAction);
    },
    getRowCells( rowEl ) {
        return Array.from( rowEl.querySelectorAll('.cross__board-item') );
    },
    fillCell(rowIndex, cellIndex, data) {
        const cell = game.cells[rowIndex][cellIndex];

        cell.innerText = '';

        if (data === X) {
            const XEL = game.crateX();

            cell.append(XEL);
        } else if (data === O) {
            const OEL = game.create0();

            cell.append(OEL);
        }
    },
    render() {
        game.board.forEach(function (rowData, rowIndex) {
            rowData.forEach( function (cellData, cellIndex) {
                game.fillCell(rowIndex, cellIndex, cellData);
            });
        });
    }
};

game.init();

console.log( game );

game.render();
