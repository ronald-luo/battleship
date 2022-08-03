const Player = (name) => {
    const unplacedShips = [
        {
            'name': 'spy',
            'shape': [[2]],
            'style': ''
        },
        {
            'name': 'anchor',
            'shape': [[2], [2]],
            'style': 'grid-template-rows: repeat(2, auto);',
            'styleX': 'grid-template-columns: repeat(3, auto);'
        },
        {
            'name': 'moscow',
            'shape': [[2], [2], [2]],
            'style': 'grid-template-rows: repeat(3, auto);',
            'styleX': 'grid-template-columns: repeat(3, auto);'
        },
        {
            'name': 'lambda',
            'shape': [[2, 0], [2, 2]],
            'style': 'grid-template-columns: repeat(2, auto); grid-template-rows: repeat(2, auto);'
        },
        {
            'name': 'nexus',
            'shape': [[2, 2], [2, 2]],
            'style': 'grid-template-columns: repeat(2, auto); grid-template-rows: repeat(2, auto);'
        },
    ];
    const board = GameBoard();
    const getName = () => name;
    const getBoard = () => board;
    const getNextShip = () => unplacedShips[0];

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

    const rotateShip = () => {
        let nextShip = getNextShip();
        let matrix = nextShip.shape;
        
        let newMatrix = []

        for (let i = 0; i < matrix[0].length; i++) {
            newMatrix.push(matrix.map(x => x[i]).reverse())
        }

        unplacedShips[0].shape = newMatrix
    };


    return { getName, attackOpp, cycleShips, getBoard, getNextShip, unplacedShips, rotateShip };
};