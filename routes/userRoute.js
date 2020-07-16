var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
var verify = require('../controllers/verifyJWT')

/* GET users listing. */
router.post('/signup', userController.create_user);
router.post('/login', userController.login_user);
router.post('/logout', userController.logout_user);
router.put('/edit', verify.verifyJWT, userController.update_user);
router.post('/check_user', verify.verifyJWT, userController.check_user);
router.put('/update_email', verify.verifyJWT, userController.update_email);
router.put('/update_password', verify.verifyJWT, userController.update_password);
router.put('/update_profile', verify.verifyJWT, userController.update_profile);

module.exports = router;