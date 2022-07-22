// const { GameBoard } = require('./GameBoard');

const Player = (name) => {
    const unplacedShips = [
        {
            'name': 'spy',
            'shape': [[2]],
        },
        {
            'name': 'anchor',
            'shape': [[2], [2]],
        },
        {
            'name': 'moscow',
            'shape': [[2], [2], [2]],
        },
        {
            'name': 'lambda',
            'shape': [[2, 0], [2, 2]],
        },
        {
            'name': 'nexus',
            'shape': [[2, 2], [2, 2]],
        },
    ];
    const board = GameBoard();
    const getName = () => name;
    const getBoard = () => board;

    const attackOpp = (col, row, opponent) => {
        let oppBoard = opponent.getBoard();
        oppBoard.recieveAttack(col, row);
    };
    
    const cycleShips = (col, row) => {
        if (unplacedShips.length > 0) {
            let ship = unplacedShips.shift();
            try {
                board.placeShip(col, row, ship);
            } catch (e) {
                unplacedShips.unshift(ship);
            }
        } else {
            console.log('all ships placed');
        }
    };

    const playerWon = (opponent) => {
        return opponent.getBoard().allShipsSunk()
    }

    return { attackOpp, cycleShips, getBoard, playerWon };
};

// module.exports = { Player };