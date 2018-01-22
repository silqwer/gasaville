var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

var mysql_dbc = require('../mysql/db_con.js')();
var connection = mysql_dbc.init();
mysql_dbc.test(connection);

/* GET home page. */
router.get('/', ctrlMain.index);

module.exports = router;
