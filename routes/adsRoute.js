var express = require('express');
var router = express.Router();
var adsController = require('../controllers/adsController')
var verify = require('../controllers/verifyJWT')
var multer = require('multer')
var upload = multer({ dest: '/uploads' })

/* GET ads listing. */
//FIXME: colocar token depois para as rotas
router.post('/create_ad', adsController.create_ads);
router.get('/get_ads_one_user', upload.single('file'), adsController.get_ads_one_user);

module.exports = router;