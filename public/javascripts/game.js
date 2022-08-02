// const { Ship } = require('./components/Ship');
// const { GameBoard } = require('./components/GameBoard');
// const { Player }  = require('./components/Player');

const planningPhase = (player) => {
    let horizontal = false;
    let allShipsPlaced = false;
    const socket = io();
    const mainBoard = document.querySelector('.main-board');
    const sideBoard = document.querySelector('.side-board');
    const roomId = document.querySelector('small').id;

    const getPlayer = () => player;

    const cellMedium = {
        '0': 'cell-sea',
        '1': 'cell-miss',
        '2': 'cell-ship',
        '3': 'cell-hit',
    };

    const clearBoard = () => {
        const nodes = document.querySelectorAll('.cell-main')

        if (nodes !== undefined) {
            nodes.forEach(node => {
                node.remove();
            });
        }
    };

    const updateData = () => {
        let newBoard = getPlayer().getBoard().board;

        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const newCell = document.createElement('div');
                const newClass = cellMedium[String(newBoard[row][col])];
                newCell.classList.add(newClass);
                newCell.classList.add('cell-main');
                newCell.setAttribute('row', row);
                newCell.setAttribute('col', col);
                mainBoard.appendChild(newCell);
            }; 
        };

        const nodes = document.querySelectorAll('.cell-main');

        nodes.forEach(node => {
            node.addEventListener('click', () => {
                let col = Number(node.getAttribute('col'));
                let row = Number(node.getAttribute('row'));

                if (player.unplacedShips.length > 0) {
                    player.cycleShips(col, row);
                    // console.log('ship placed');
                } else {
                    // test attacking self 
                    // player.getBoard().recieveAttack(col, row);
                    console.log('attack ' + col + ', ' + row);
                }

                // console.log(player.getBoard().board);
            });
        });

    };

    const clearNextShip = () => {
        const nodes = document.querySelectorAll('.cell-side')
        sideBoard.setAttribute('style', '')

        if (nodes !== undefined) {
            nodes.forEach(node => {
                node.remove();
            });
        }
    }

    const queueUp = () => {
        document.querySelector('.start-button').remove();
        let waiting = document.createElement('div');
        waiting.classList.add('start-button');
        waiting.classList.add('loading');
        waiting.textContent = "waiting..";
        sideBoard.appendChild(waiting);
        socket.emit('join room', { room: roomId });
    };

    const updateNextShip = () => {
        let nextShip = getPlayer().getNextShip();
        
        if (nextShip !== undefined) {

            let name = nextShip.name;
            let shape = nextShip.shape;
            let style = nextShip.style;

            sideBoard.setAttribute('style', style);

            // handle horizontal and vertical rotation
            if (shape.length > shape[0].length) {
                sideBoard.setAttribute('style', style);
            } else {

                if (nextShip.styleX !== undefined) {
                    sideBoard.setAttribute('style', nextShip.styleX);
                }
            }

            for (let row = 0; row < shape.length; row++) {
                for (let col = 0; col < shape[0].length; col++) {
                    const newCell = document.createElement('div');
                    
                    newCell.classList.add('cell-side');
                    newCell.classList.add(cellMedium[String(shape[row][col])])

                    sideBoard.appendChild(newCell)

                };
            };

            document.querySelector('.ship-name').textContent = name;
        } else if (allShipsPlaced === true) {
            return
        } else {
            document.querySelector('.rotate-button-container').remove()
            document.querySelector('.ship-name').textContent = 'ready?'
            allShipsPlaced = true;

            let startButton = document.createElement('div');
            startButton.textContent = 'continue';
            startButton.setAttribute('type', 'submit');
            startButton.classList.add('start-button');

            startButton.addEventListener('mouseover', () => {
                document.querySelector('.ship-name').textContent = 'good luck!';
            });

            startButton.addEventListener('mouseout', () => {
                document.querySelector('.ship-name').textContent = 'ready?';
            });

            startButton.addEventListener('click', () => {
                queueUp()
            });

            sideBoard.appendChild(startButton)
        };
    };

    const rotateShip = () => {
        getPlayer().rotateShip()
        horizontal ? horizontal = false : horizontal = true
    };

    const renderData = () => {
        clearBoard();
        updateData();
        clearNextShip();
        updateNextShip();
    };

    return { renderData, rotateShip }
};

let player = Player('nick');
let game = planningPhase(player);
game.renderData();

document.addEventListener('click', () => {
    game.renderData()
})

// module.exports = { Ship, GameBoard, Player };