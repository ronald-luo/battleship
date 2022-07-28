/** board value key: 
 * 0 - water
 * 1 - miss
 * 2 - ship
 * 3 - hit
 */

/** board rules
 * board[y][x] or board[col][row] to index
 * col is x
 * row is y
 */

// const { Ship } = require('./Ship');

const GameBoard = () => {
    const placedShipCoords = {}; // ["x,y", ...]
    const placedShips = []; // [{Object: Ship}, ...]
    const board = [];

    const initBoard = (() => {
        if (board.length === 0) {
            for (let row = 0; row < 10; row++) {
                board.push([]);
                for (let col = 0; col < 10; col++) {
                    board[row][col] = 0;
                };
            };
        };
    })();

    const placeShip = (x, y, ship) => {
        let matrix = ship.shape;
        let rows = matrix.length;
        let cols = matrix[0].length;
        let xNew = x + cols;
        let yNew = y + rows;
        let rowBoundary = 0 <= xNew && xNew <= board.length;
        let colBoundary = 0 <= yNew && yNew <= board[0].length;

        // check if already occupied
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (placedShipCoords[`${x + col},${y + row}`] !== undefined) {
                   throw new Error('Overlapping ships');
                };
            };
        };

        if (rowBoundary && colBoundary) {
            let shipCoords = new Set();
            
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {

                    if (matrix[row][col] !== 0) {
                        board[y + row][x + col] = matrix[row][col];
                    }

                    if (board[y + row][x + col] === 2) {
                        shipCoords.add(`${x + col},${y + row}`);
                    };

                };
            };
            
            let newShip = Ship(ship.name, shipCoords);

            placedShips.push(newShip);
            
            for (let coord of newShip.getCoords()) {
                placedShipCoords[coord] = newShip;
            };
        } else {
            throw new Error('Out of bounds')
        }
    };

    const allShipsSunk = () => {
        for (let ship of placedShips) {
            if (ship.isSunk() === false) {
                return false;
            }
        };
        return true;
    };

    const recieveAttack = (x, y) => {
        switch (board[y][x]) {
            case 0: 
                // hit water -> switch to miss
                board[y][x] = 1;
                break;
            case 2: 
                // hit ship -> switch to hit
                placedShipCoords[`${x},${y}`].hit(x, y);
                board[y][x] = 3;
                break;
            default:
        }
    };

    return { board, placedShips, placedShipCoords, allShipsSunk, placeShip, recieveAttack };
};

// module.exports = { GameBoard };