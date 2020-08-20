var express = require('express');
var router = express.Router();
var adsController = require('../controllers/adsController')
var verify = require('../controllers/verifyJWT')
var multer = require('multer')
var multerConfig = require('../config/multer_config');




/* GET ads listing. */
//FIXME: colocar token depois para as rotas
router.post('/create_ad', multer(multerConfig).array('varios', 5), adsController.create_ads);
/* [
    { name: '_locator_fk', maxCount: 1 },
    { name: 'title', maxCount: 1 },
    { name: 'images', maxCount: 1 },
    { name: 'value', maxCount: 1 },
    { name: 'description', maxCount: 1 },
    { name: 'category', maxCount: 1 },
    { name: 'file', maxCount: 5 },
]), adsController.create_ads); */
router.get('/get_ads_one_user', adsController.get_ads_one_user);

module.exports = router;