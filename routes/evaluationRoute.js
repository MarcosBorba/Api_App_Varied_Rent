var express = require('express');
var router = express.Router();
var evaController = require('../controllers/evaluationController')
var verify = require('../controllers/verifyJWT')

/* GET ads listing. */
router.post('/addEvaluation', evaController.add_add);

module.exports = router;