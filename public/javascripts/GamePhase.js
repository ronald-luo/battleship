const GamePhase = (player, socket) => {
    const getPlayer = () => player;
    const mainBoard = document.querySelector('.main-board');
    const sideBoard = document.querySelector('.side-board');
    const roomId = document.querySelector('small').id;
    let opponentBoard = null;
    let attackedCoords = new Set();
    let firstClear = false;
    
    const clearBoard = () => {
        const nodes = document.querySelectorAll('.cell-main')

        if (nodes !== undefined) {
            nodes.forEach(node => {
                node.remove();
            });
        };

        const cellOpponent = document.querySelectorAll('.cell-opponent')

        if (cellOpponent !== undefined) {
            cellOpponent.forEach(node => {
                node.remove();
            });
        };
    };

    const clearSide = () => {
        if (firstClear == false) {
            firstClear = true;
            const startButton = document.querySelector('.start-button');
            sideBoard.removeChild(startButton);
        }

        const selfCells = document.querySelectorAll('.cell-self');
        selfCells.forEach(node => {
            node.remove();
        })
    }

    const updateMain = () => {
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const newCell = document.createElement('div');
                // const newClass = cellMedium[String(newBoard[row][col])];
                // newCell.classList.add(newClass);
                newCell.classList.add('cell-opponent');
                newCell.setAttribute('row', row);
                newCell.setAttribute('col', col);

                if (attackedCoords.has(`${col},${row}`)) {
                    if (opponentBoard !== null) {
                        if (opponentBoard[row][col] === 2 || opponentBoard[row][col] === 3) {
                            newCell.classList.add('cell-hit');
                        } else {
                            newCell.classList.add('cell-miss');
                        };
                    };
                };

                mainBoard.appendChild(newCell);
            }; 
        };

        const nodes = document.querySelectorAll('.cell-opponent');

        nodes.forEach(node => {
            node.addEventListener('click', () => {
                let col = Number(node.getAttribute('col'));
                let row = Number(node.getAttribute('row'));

                attackedCoords.add(`${col},${row}`);

                // console.log('test attack ' + col + ', ' + row);
                socket.emit('attack', { coord: `${col},${row}`, room: roomId, name: getPlayer().getName()});
            });
        });
    };

    const updateSideBoard = () => {
        const cellMedium = {
            '0': 'cell-sea',
            '1': 'cell-miss',
            '2': 'cell-ship',
            '3': 'cell-hit',
        };

        const newBoard = getPlayer().getBoard().board;

        sideBoard.setAttribute('style', 'padding: 0; grid-template-columns: repeat(10, 1fr); grid-template-rows: repeat(10, 1fr);');

        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const newCell = document.createElement('div');
                const newClass = cellMedium[String(newBoard[row][col])];
                newCell.classList.add(newClass);
                newCell.classList.add('cell-self');
                newCell.setAttribute('row', row);
                newCell.setAttribute('col', col);
                sideBoard.appendChild(newCell);
            }; 
        };
    };

    const lossDetector = () => {
        if (getPlayer().getBoard().allShipsSunk() === true) {
            socket.emit('game_over', { name: getPlayer().getName() })
        }
    };

    const attackListener = (() => {
        socket.on('attack', (data) => {

            // console.log(getPlayer().getName())
            // console.log(data.name)

            if (getPlayer().getName() !== data.name) {
                // console.log('being attacked ' + data.coord)
                let col = data.coord[0];
                let row = data.coord[2];

                getPlayer().getBoard().recieveAttack(col, row);
            }

            socket.emit('update_main', { room: roomId, name: getPlayer().getName(), board: getPlayer().getBoard().board });

            renderData();
        })
    })();

    const updateMainListener = (() => {
        socket.on('update_main', (data) => {
            if (getPlayer().getName() !== data.name) {
                opponentBoard = data.board;
                // console.log(opponentBoard);
            };

            renderData();
        });
    })();

    const gameOverListener = (() => {
        socket.on('game_over', (data) => {

        });
    })();

    const renderData = () => {
        clearBoard();
        updateMain();
        clearSide();
        updateSideBoard();
        lossDetector();
    };

    return { renderData, attackListener, updateMainListener, gameOverListener }
};

