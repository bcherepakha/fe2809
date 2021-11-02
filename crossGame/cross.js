const X = 'x';
const O = '0';
const EMPTY = ' ';
const gameStatuses = {
    NOT_STARTED: 'NOT_STARTED',
    STARTED: 'STARTED',
    ENDED: 'ENDED',
    DRAWITEM: 'DRAWITEM',
};

const game = {
    board: [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]
    ],
    currentUser: X,
    status: gameStatuses.NOT_STARTED,
    userBoardAction( rowIndex, cellIndex ) {
        //? LE = { rowIndex: 0, cellIndex: 1, action: f }
        return function action(e) {
            game.step(rowIndex, cellIndex);
        }
    },
    step(rowIndex, cellIndex) {
        if (game.status !== gameStatuses.STARTED
            || game.board[rowIndex][cellIndex] !== EMPTY) {
            return false;
        }

        const currentUser = game.currentUser;

        game.board[rowIndex][cellIndex] = currentUser;

        game.status = gameStatuses.DRAWITEM;
        game.fillCell(rowIndex, cellIndex, currentUser);

        const winLine = game.findWinLine(currentUser);

        if (winLine) {
            // выдаем сообщение и завершаем игру
            game.status = gameStatuses.ENDED;
        } else {
            // передаем ход
            game.currentUser = currentUser === X ? O : X;
        }
    },
    statusAlert() {
        if (game.status === gameStatuses.ENDED) {
            const currentUser = game.currentUser;

            alert(`Выиграли ${currentUser === X ? 'крестики' : 'нолики'}`);
        } else if (game.status === gameStatuses.DRAWITEM) {
            game.status = gameStatuses.STARTED;
        }
    },
    getLines() {
        const lines = game.board.map(function (row, index) {
            return {
                items: row,
                index,
                type: 'row'
            };
        });

        // add columns
        for (let i=0; i < 3; i++) {
            const column = {
                type: 'column',
                index: i,
                items: [
                    game.board[0][i],
                    game.board[1][i],
                    game.board[2][i]
                ]
            };

            lines.push(column);
        }

        lines.push({
            type: 'diagonal',
            index: 0,
            items: [
                game.board[0][0],
                game.board[1][1],
                game.board[2][2]
            ]
        }, {
            type: 'diagonal',
            index: 1,
            items: [
                game.board[0][2],
                game.board[1][1],
                game.board[2][0]
            ]
        });

        return lines;
    },
    isLineWin(line, symbol) {
        // for (let num = 0; num < 3; num++) {
        //     if (line.items[num] !== symbol) {
        //         return false;
        //     }
        // }

        // return true;
        return line.items
            .every(function (s) {
                return s === symbol;
            });
    },
    findWinLine(symbol) {
        const lines = game.getLines();

        return lines.find(function (line) {
            return game.isLineWin(line, symbol);
        });
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

        svgRoot.addEventListener('animationend', game.statusAlert);

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

        line2.addEventListener('animationend', game.statusAlert);

        return svgRoot;
    },
    start() {
        game.board = [
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY]
        ];
        game.currentUser = X;
        game.status = gameStatuses.STARTED;

        game.render();
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
                cell.addEventListener('click', game.userBoardAction(i, cellIndex) );
            });
        }

        game.status = gameStatuses.STARTED;

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

const startBtn = document.querySelector('.action--start');

startBtn.addEventListener('click', function () {
    game.start();
})
