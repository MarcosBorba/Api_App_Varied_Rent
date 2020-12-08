var express = require('express');
var router = express.Router();
var adsController = require('../controllers/adsController')
var verify = require('../controllers/verifyJWT')
var multer = require('multer')
var multerConfig = require('../config/multer_config');

/* GET ads listing. */
//FIXME: colocar token depois para as rotas
router.post('/create_ad', multer(multerConfig).array('varios', 5), adsController.create_ads);
router.get('/get_ads_one_user', adsController.get_ads_one_user);
router.delete('/delete_ads', adsController.delete_ads);
router.put('/update_ad', multer(multerConfig).array('varios', 5), adsController.update_ads);

module.exports = router;