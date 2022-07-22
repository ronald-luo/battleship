// const { Ship } = require('./components/Ship');
// const { GameBoard } = require('./components/GameBoard');
// const { Player }  = require('./components/Player');

const player1 = Player('test')

const mainBoard = document.querySelector('.main-board');

const clearBoard = () => {
    const nodes = document.querySelectorAll('.main-cell')
    nodes.forEach(node => {
        node.remove();
    });
};

// const renderBoard = (board) => {
//     let rows = board.length;
//     let cols = board[0].length;

//     for (let r = 0; r < rows.length; r++) {
//         for (let c = 0; c < cols.length; c++) {
//             const cell = document.createElement('div');
//             cell.classList.add('main-cell')
//             if (board[r][c] === 2) {
//                 cell.classList.add('ship')
//             }
//             cell.setAttribute('x', row);
//             cell.setAttribute('y', col);
//             mainBoard.appendChild(cell);
//         }
//     }
// }

const updateClass = () => {

}

for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
        const cell = document.createElement('div');
        cell.classList.add('main-cell')
        cell.setAttribute('row', row);
        cell.setAttribute('col', col);
        mainBoard.appendChild(cell);
    }
}

const nodes = document.querySelectorAll('.main-cell')


const addListeners = () => {
    nodes.forEach(node => {
        node.addEventListener('click', () => {
            let col = Number(node.getAttribute('col'));
            let row = Number(node.getAttribute('row'));
            player1.cycleShips(col, row);
            
            console.log(player1.getBoard().board)
        })
    })
}

addListeners()

// const loop = () => {
//     clearBoard();
//     renderBoard();
//     addListeners()
// }

// const Game = (player1, player2) => {
//     const planning = false;

//     const planningPhase = () => {
        
//     };

//     return { planningPhase }
// };


















// module.exports = { Ship, GameBoard, Player };