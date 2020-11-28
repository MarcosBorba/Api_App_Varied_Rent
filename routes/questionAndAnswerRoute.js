var express = require('express');
var router = express.Router();
var evaluationController = require('../controllers/questionAndAnswerController')
var verify = require('../controllers/verifyJWT')

//TODO: nivel 4: add jwt tokens
/* GET ads listing. */
router.post('/add_question_and_answer', evaluationController.add_question_and_answer);
router.get('/get_questions_and_answers_one_ad', evaluationController.get_questions_and_answers_one_ad);
router.put('/update_question_and_answer_one_ad', evaluationController.update_question_and_answer_one_ad);

module.exports = router;