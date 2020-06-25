var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
var verify = require('../controllers/verifyJWT')

/* GET users listing. */
router.post('/signup', userController.create_user);
router.post('/login', userController.login_user);
router.post('/logout', userController.logout_user);
router.put('/edit', verify.verifyJWT, userController.update_user);

module.exports = router;