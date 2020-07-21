var express = require('express');
var router = express.Router();
var adsController = require('../controllers/adsController')
var verify = require('../controllers/verifyJWT')

/* GET ads listing. */
router.post('/adsUser', verify.verifyJWT, adsController);

module.exports = router;