var express = require('express');
var router = express.Router();
var evaluationController = require('../controllers/evaluationController')
var verify = require('../controllers/verifyJWT')

/* GET ads listing. */
router.post('/addEvaluation', evaluationController.add_evaluation);
router.get('/get_evaluations_one_ad', evaluationController.get_evaluations_one_ad);

module.exports = router;