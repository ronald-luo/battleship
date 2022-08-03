module.exports = (io) => {

    let activeRooms = {};
    let activeBoards = {};

    const handleJoin = function (data) {
        const socket = this;

        if (activeRooms[data.room] === undefined) {
            // add data.room = ['person1'] to activeRoom dict if not exist
            activeRooms[data.room] = [data.name];
            activeBoards[data.room] = {};
            activeBoards[data.room][data.name] = data.board;
            socket.join(data.room);
        } 
        else if (activeRooms[data.room].length === 2) {
            // send alert that room is full
            console.log(`room ${data.room} is full`)
            return
        }
        else if (activeRooms[data.room] !== undefined) {
            // make it so data.room = ['person1', 'person2'] if dict does exist
            activeRooms[data.room].push(data.name);
            activeBoards[data.room][data.name] = data.board;
            socket.join(data.room);
        }

        if (activeRooms[data.room].length === 2) {
            // once 2 players are in a room, emit 'start game' event to all players in the room '13xx'
            // console.log('starting game...');
            // console.log(activeRooms);
            // console.log(activeBoards);
            io.sockets.in(data.room).emit('start_game', { boards: activeBoards[data.room] });
        }
    };

    const handleAttack = function (data) {
        io.sockets.in(data.room).emit('attack', {coord: data.coord, name: data.name })
    };

    const updateMain = function (data) {
        // update opponent board on server after attacking them
        activeBoards[data.room][data.name] = data.board
        io.sockets.in(data.room).emit('update_main', { board: activeBoards[data.room][data.name], name: data.name })
    };

    const handleGameOver = function (data) {
        io.sockets.in(data.room).emit('game_over', { name: data.name, room: '' })
    };

    const handleMove = function () {

    }

    return {
        handleJoin, handleAttack, updateMain, handleGameOver, handleMove
    };
};