var express = require('express');
var router = express.Router();
const roomController = require('../controllers/index.js');

/* GET home page. */
router.get('/', roomController.getHome);

router.get('/:room', roomController.getRoom);

router.post('/join-or-create', roomController.postJoinOrCreate);

module.exports = router;
