var express = require('express');
var router = express.Router();
var adsController = require('../controllers/adsController')
var verify = require('../controllers/verifyJWT')

/* GET ads listing. */
//FIXME: colocar token depois para as rotas
router.post('/create_ad', adsController.create_ads);

module.exports = router;