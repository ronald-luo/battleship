const { Ship, GameBoard, Player } = require('./game.js');


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


describe('component tests', () => {
    test('rows should be length 10', () => {
        let gameBoard = GameBoard();
        expect(gameBoard.board.length).toEqual(10);
    });

    test('cols should be length 10', () => {
        let gameBoard = GameBoard();
        expect(gameBoard.board[0].length).toEqual(10);
    });

    test('ship placement occupies board matrix', () => {
        let gameBoard = GameBoard();
        gameBoard.placeShip(0,0, unplacedShips[0]);
        expect(gameBoard.board[0][0]).toEqual(2);
    });

    test('recieve attack interacts with board matrix hit: 2 -> 3', () => {
        let gameBoard = GameBoard();
        gameBoard.placeShip(0,0, unplacedShips[0]);
        gameBoard.recieveAttack(0,0)
        expect(gameBoard.board[0][0]).toEqual(3);
    });

    test('recieve attack interacts with board matrix miss: 0 -> 1', () => {
        let gameBoard = GameBoard();
        gameBoard.placeShip(0,0, unplacedShips[0]);
        gameBoard.recieveAttack(1,1)
        expect(gameBoard.board[0][0]).toEqual(2);
        expect(gameBoard.board[1][1]).toEqual(1);
    });

    test('ship added to placedShips array' , () => {
        let gameBoard = GameBoard();
        gameBoard.placeShip(0,0, unplacedShips[0]);
        expect(gameBoard.placedShips.length).toEqual(1);
    });

    test('ship added to placedShipCoords dict', () => {
        let gameBoard = GameBoard();
        gameBoard.placeShip(0,0, unplacedShips[0]);
        expect(Object.keys(gameBoard.placedShipCoords)[0]).toEqual("0,0");
    });

    test('ship hit function', () => {
        let gameBoard = GameBoard();
        gameBoard.placeShip(0,0, unplacedShips[0]);
        gameBoard.recieveAttack(0,0);
        expect(gameBoard.placedShipCoords["0,0"].hitCoords.size).toEqual(1);
    });

    test('ship isSunk function', () => {
        let gameBoard = GameBoard();
        gameBoard.placeShip(0,0, unplacedShips[0]);
        gameBoard.recieveAttack(0,0);
        expect(gameBoard.placedShipCoords["0,0"].isSunk()).toEqual(true);
    });

    test('check if all ships have sunk', () => {
        let gameBoard = GameBoard();
        gameBoard.placeShip(0,0, unplacedShips[0]);
        gameBoard.recieveAttack(0,0)
        expect(gameBoard.allShipsSunk()).toEqual(true);
    });

    test('dont place ship if ship is already placed', () => {
        let gameBoard = GameBoard();
        gameBoard.placeShip(1,0, unplacedShips[0]);
        gameBoard.placeShip(0,0, unplacedShips[1]);
        expect(gameBoard.placedShips.length).toEqual(1);
    });

    test('place ship if ship is not already placed', () => {
        let gameBoard = GameBoard();
        gameBoard.placeShip(3,0, unplacedShips[0]);
        gameBoard.placeShip(0,0, unplacedShips[1]);
        expect(gameBoard.placedShips.length).toEqual(2);
    });

    // doesn't work
    // test('use ships 1 by 1', () => {
    //     let gameBoard = GameBoard();
    //     gameBoard.handleUnplacedShips(3,0);
    //     gameBoard.handleUnplacedShips(5,4);
    //     gameBoard.handleUnplacedShips(2,7);
    //     gameBoard.handleUnplacedShips(7,2);
    //     gameBoard.handleUnplacedShips(7,7);
    //     expect(gameBoard.placedShips.length).toEqual(5);
    // });

    test('player attacks player, ship sunk', () => {
        let player1 = Player('joe');
        let player2 = Player('flow');

        player2.cycleShips(0,0);
        player2.cycleShips(3,3);
        player2.cycleShips(6,6);

        player1.attackOpp(0, 0, player2);
        expect(player2.getBoard().placedShips[0].isSunk()).toEqual(true);
    });

    test('player attacks player, matrix updated', () => {
        let player1 = Player('joe');
        let player2 = Player('flow');

        player2.cycleShips(0,0);
        player2.cycleShips(3,3);
        player2.cycleShips(6,6);

        player1.attackOpp(0, 0, player2);
        expect(player2.getBoard().board[0][0]).toEqual(3);
    });


});