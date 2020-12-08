var express = require('express');
var router = express.Router();
var favoriteAdsController = require('../controllers/favoriteAdsController')
var verify = require('../controllers/verifyJWT')

/* GET favorite ads listing. */
//FIXME: colocar token depois para as rotas
router.post('/add_favorite_ad', favoriteAdsController.add_favorite_ad);
router.get('/get_favorite_ad_one_user', favoriteAdsController.get_favorite_ad_one_user);
router.delete('/delete_favorite_ad', favoriteAdsController.delete_favorite_ad);

module.exports = router;