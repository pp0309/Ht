var express = require('express');
var router = express.Router();
const resig=require('../contro/contro');
/* GET home page. */
router.post('/sig',resig.resig);
router.post('/lod',resig.lod);
module.exports = router;
