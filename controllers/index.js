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
  
        res.redirect(req.body['room-id']);
    }
  
    // create room 
    if (req.body.create !== undefined) {
        let id = '';
        for (let i = 0; i < 4; i++) {
            id += Math.floor(Math.random() * 9);
        };

        res.redirect(id)
    }
};



module.exports = { getHome, getRoom, postJoinOrCreate };