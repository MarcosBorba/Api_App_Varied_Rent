const QuestionAndAnswerModel = require('../models/questionAndAnswerModel');
const { ErrorHandler } = require('../controllers/errorHandler');

module.exports = {
    add_question_and_answer: async(req, res, next) => {
        try {
            const { _ad_fk, _tenant_fk, question, answer } = req.body;

            const newQuestionAndAnswer = new QuestionAndAnswerModel({
                _ad_fk,
                _tenant_fk,
                question,
                answer,
            });

            await newQuestionAndAnswer.save()
                .then(questionAndAnswer => {
                    res.status(200).send({ message: 'create successfully', id: questionAndAnswer._id });
                })
                .catch(error => {
                    throw new ErrorHandler(500, 'Registration error => ' + Object.values(error.errors)[0])
                })
        } catch (error) {
            console.log("error controller -> ", error.message)
            if (error instanceof ErrorHandler) {
                next(error);
            } else {
                next(new ErrorHandler(500, "Internal Server Error"));
            }
        }
    },
    get_questions_and_answers_one_ad: async(req, res, next) => {
        try {
            let { _ad_fk } = req.query;
            console.log('req query', req.query)
            console.log('ad fk = ', _ad_fk)
            const findQuestionsAndAnswerOneAd = await QuestionAndAnswerModel.find({ '_ad_fk': _ad_fk });
            if (findQuestionsAndAnswerOneAd == null) throw new ErrorHandler(404, "No question and answer ad found");
            console.log("find QuestionAndAnswer is > ", findQuestionsAndAnswerOneAd);
            res.status(200).send({ question_and_answer: findQuestionsAndAnswerOneAd });
        } catch (error) {
            console.log(error.message)
            if (error instanceof ErrorHandler) {
                next(error);
            } else {
                next(new ErrorHandler(500, "Internal Server Error"));
            }
        }
    },
    update_question_and_answer_one_ad: async(req, res, next) => {
        try {
            let { _id, _ad_fk, _tenant_fk, question, answer } = req.query;
            console.log('req query', req.query)
            console.log('id = ', _id)

            const newQuestionAndAnswer = new QuestionAndAnswerModel({
                _id,
                _ad_fk,
                _tenant_fk,
                question,
                answer,
            })
            const updateQuestionsAndAnswer = await QuestionAndAnswerModel.findOneAndUpdate({ '_id': _id }, {
                $set: {
                    'question': newQuestionAndAnswer.question,
                    'answer': newQuestionAndAnswer.answer == '' ? null : newQuestionAndAnswer.answer,
                }
            });
            if (updateQuestionsAndAnswer == null) throw new ErrorHandler(404, "No question and answer ad found");
            //console.log("update QuestionAndAnswer is > ", updateQuestionsAndAnswer);
            res.status(200).send({ question_and_answer: updateQuestionsAndAnswer });
        } catch (error) {
            console.log(error.message)
            if (error instanceof ErrorHandler) {
                next(error);
            } else {
                next(new ErrorHandler(500, "Internal Server Error"));
            }
        }
    }
}