let activeRooms = new Set();

const createRoomId = () => {
    let id = '';
    for (let i = 0; i < 4; i++) {
        id += Math.floor(Math.random() * 9);
    };
    return id;
};

const getHome = (req, res, next) => {
    res.render('home', {});
};

const getRoom = function(req, res, next) {
    res.render('game', {'room': req.params.room });
};

const postJoinOrCreate = function(req, res, next) {

    // join room
    if (req.body.join !== undefined) {
  
        if (req.body['room-id'] === '') {
            res.redirect('/')
        };

        if (activeRooms.has(req.body['room-id']) === true) {
            res.redirect(req.body['room-id']);
        }

        res.render(error, {room: req.body['room-id']})
    }
  
    // create room 
    if (req.body.create !== undefined) {
        let roomId = createRoomId();
        
        // while room already exists, create a new room.
        while (activeRooms.has(roomId)) {
            roomId = createRoomId();
        };
        activeRooms.add(roomId)
        res.redirect(roomId)
    }
};



module.exports = { getHome, getRoom, postJoinOrCreate };