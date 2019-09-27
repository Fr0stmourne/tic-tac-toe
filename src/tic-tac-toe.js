const playersTable = {
    0: 'x',
    1: 'o'
}

class TicTacToe {
    constructor() {
        this._field = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]
        this._counter = 0;
        this._currentPlayer = this._counter % 2;
    }

    getCurrentPlayerSymbol() {
        return playersTable[this._currentPlayer];
    }

    nextTurn(rowIndex, columnIndex) {
        if (this.getFieldValue(rowIndex, columnIndex) === null) {
            this._field[rowIndex][columnIndex] = this.getCurrentPlayerSymbol();
            this._counter++;
            this._currentPlayer = this._counter % 2;
        }
    }

    isFinished() {
        return !!this.getWinner() || this.isDraw();
    }

    getWinner() {
        let winnerSymbol = null;
        let fieldCopy = this._field.slice();
        let diagonalRows = [
            [],
            []
        ];
        for (let i = 0; i < 3; i++) {
            diagonalRows[0].push(fieldCopy[i][i]);
            diagonalRows[1].push(fieldCopy[2 - i][i]);
        }
        let verticalRows = [
            [],
            [],
            []
        ];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                verticalRows[i].push(fieldCopy[j][i]);
            }
        }
        diagonalRows.forEach(row => {
            fieldCopy.push(row);
        })

        verticalRows.forEach(row => {
            fieldCopy.push(row);
        })

        fieldCopy.forEach(row => {
            for (let value of Object.values(playersTable)) {
                if (row.every(el => el === value)) winnerSymbol = value;
            }
        })

        return winnerSymbol;
    }

    noMoreTurns() {
        let noMoreTurns = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.getFieldValue(i, j) === null) noMoreTurns = false;
            }
        }
        return noMoreTurns;
    }

    isDraw() {
        return this.noMoreTurns() && !this.getWinner();
    }

    getFieldValue(rowIndex, colIndex) {
        return this._field[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;