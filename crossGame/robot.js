function Robot(userName) {
    this.userName = userName;
}

Robot.prototype.conversation = function ( game ) {
    console.log( 'conversation', this ); // ?
    if (game.currentUser === this.userName) {
        game.setRobotMove();

        const { rowIndex, cellIndex } = this.calculateStep( game );

        game.step(rowIndex, cellIndex);
    }
}

Robot.prototype.calculateStep = function ( game ) {
    return this.userName === 'x'
        ? this.calculateStepX( game )
        : this.calculateStep0( game );
}

Robot.prototype.calculateStepX = function ( game ) {

}

Robot.prototype.calculateStep0 = function ( game ) {
    const lines = game.getLines();
    const readyToWinLine = lines
        .find(l => this.isReadyToWinLine(l, game.symbols.X, game.symbols.EMPTY));

    if (readyToWinLine) {
        return this.getEmtyLineCoords(readyToWinLine);
    }

    const myReadyToWinLine = lines
        .find(l => this.isReadyToWinLine(l, game.symbols.O, game.symbols.EMPTY));

    if (myReadyToWinLine) {
        return this.getEmtyLineCoords(myReadyToWinLine);
    }

    if (game.steps[0].rowIndex === 1 && game.steps[0].cellIndex === 1) {
        const corner = this.getEmptyCornerCoords( game );

        if (corner) {
            return corner;
        }

        return this.getRandomEmptyCoords();
    }

    if (game.steps.length === 1) {
        return {
            rowIndex: 1,
            cellIndex: 1
        };
    }

    if (this.isCorner(game.steps[0]) && game.steps.length === 3) {
        const opositeCorner = {
            rowIndex: 2 - game.steps[0].rowIndex,
            cellIndex: 2 - game.steps[0].cellIndex,
        };

        if (game.board[opositeCorner.rowIndex][opositeCorner.cellIndex] === game.symbols.EMPTY) {
            return opositeCorner;
        }

        return this.getRandomSideCoords( game ) || this.getRandomEmptyCoords( game );
    }

    if (this.isCorner(game.steps[2]) && game.steps.length === 3) {
        const opositeCorner = {
            rowIndex: 2 - game.steps[0].rowIndex,
            cellIndex: 2 - game.steps[0].cellIndex,
        };

        return opositeCorner;
    }

    if (this.isOpositeSide(game.steps[0], game.steps[2]) && game.steps.length === 4) {
        return this.getEmptyCornerCoords( game );
    }

    if (game.steps.length === 4) {
        return this.getBeetweenCorner(game.steps[0], game.steps[2]);
    }

    return this.getRandomEmptyCoords( game );
}

Robot.prototype.getBeetweenCorner = function(step0, step3) {
    if ((step0.rowIndex === 0 && step0.cellIndex === 1 && step1.rowIndex === 1 && step1.cellIndex === 0)
    || (step1.rowIndex === 0 && step1.cellIndex === 1 && step0.rowIndex === 1 && step0.cellIndex === 0)) {
        return {
            rowIndex: 0,
            cellIndex: 0
        }
    }

    if ((step0.rowIndex === 0 && step0.cellIndex === 1 && step1.rowIndex === 1 && step1.cellIndex === 2)
    || (step1.rowIndex === 0 && step1.cellIndex === 1 && step0.rowIndex === 1 && step0.cellIndex === 2)) {
        return {
            rowIndex: 0,
            cellIndex: 2
        }
    }

    if ((step0.rowIndex === 2 && step0.cellIndex === 1 && step1.rowIndex === 1 && step1.cellIndex === 2)
    || (step1.rowIndex === 2 && step1.cellIndex === 1 && step0.rowIndex === 1 && step0.cellIndex === 2)) {
        return {
            rowIndex: 2,
            cellIndex: 2
        }
    }

    if ((step0.rowIndex === 2 && step0.cellIndex === 1 && step1.rowIndex === 1 && step1.cellIndex === 0)
    || (step1.rowIndex === 2 && step1.cellIndex === 1 && step0.rowIndex === 1 && step0.cellIndex === 0)) {
        return {
            rowIndex: 2,
            cellIndex: 0
        }
    }
}

Robot.prototype.isOpositeSide = function ( step1, step2 ) {
    return step1.cellIndex === step2.cellIndex && step2.rowIndex + step1.rowIndex === 2
    || step1.rowIndex === step2.rowIndex && step2.cellIndex + step1.cellIndex === 2;
}

Robot.prototype.getRandomSideCoords = function (game) {
    const emptyItems = game.board
        .map((row, rowIndex) => row
            .map((cellItem, cellIndex) => ({
                cellIndex,
                rowIndex,
                cellItem,
            })))
        .flat()
        .filter(({ cellItem }) => cellItem === game.symbols.EMPTY)
        .filter(({ cellIndex, rowIndex }) => [1, 3].includes(cellIndex + rowIndex));
    const randomElNumber = Math.floor( Math.random() * emptyItems.length );

    return emptyItems[ randomElNumber ];
}


Robot.prototype.getRandomEmptyCoords = function (game) {
    const emptyItems = game.board
        .map((row, rowIndex) => row
            .map((cellItem, cellIndex) => ({
                cellIndex,
                rowIndex,
                cellItem,
            })))
        .flat()
        .filter(({ cellItem }) => cellItem === game.symbols.EMPTY);
    const randomElNumber = Math.floor( Math.random() * emptyItems.length );

    return emptyItems[ randomElNumber ];
}

Robot.corners = [
    {
        rowIndex: 0,
        cellIndex: 0,
    },
    {
        rowIndex: 0,
        cellIndex: 2,
    },
    {
        rowIndex: 2,
        cellIndex: 2,
    },
    {
        rowIndex: 2,
        cellIndex: 0,
    },
];

Robot.prototype.isCorner = function ( stepData ) {
    return !!Robot.corners.find(({ cellIndex, rowIndex }) => {
        return stepData.rowIndex === rowIndex && stepData.cellIndex === cellIndex;
    });
}

Robot.prototype.getEmptyCornerCoords = function ( game ) {
    return Robot.corners
        .find(({ rowIndex, cellIndex }) => game.boards[rowIndex][cellIndex] === game.symbols.EMPTY);
}

Robot.prototype.getEmtyLineCoords = function (line) {
    const emptyIndex = line.items.findIndex(s => s === game.symbols.EMPTY);

    if (line.type === 'row') {
        return {
            rowIndex: line.index,
            cellIndex: emptyIndex,
        };
    }

    if (line.type === 'column') {
        return {
            cellIndex: line.index,
            rowIndex: emptyIndex
        }
    }

    if (line.type === 'diagonal') {
        if (emptyIndex === 1) {
            return {
                cellIndex: 1,
                rowIndex: 1
            }
        }

        if (emptyIndex === 0) {
            return {
                cellIndex: line.index*2,
                rowIndex: 0
            }
        }

        if (emptyIndex === 2) {
            return {
                cellIndex: (1 - line.index)*2,
                rowIndex: 2
            }
        }
    }
}

Robot.prototype.isReadyToWinLine = function ( line, winSymbol, emptySymbol ) {
    return line.items.includes(emptySymbol)
        && line.items.filter(s => s === winSymbol).length === 2;
}
