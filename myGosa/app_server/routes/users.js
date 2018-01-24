var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');


/* GET users listing. */
router.get('/', ctrlUsers.index);
module.exports = router;
