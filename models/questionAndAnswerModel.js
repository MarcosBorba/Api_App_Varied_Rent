const mongoose = require('mongoose')
mongoose.set('debug', true)
const beautifyUnique = require('mongoose-beautiful-unique-validation');
//TODO: mudar no backend e frontend para trabalhar com do usuario
// para verificar relacoes do usuario com os anuncios e seus sub servicos
const newQuestionAndAnswer = new mongoose.Schema({
    _ad_fk: { type: String, required: [true, 'Ad Foreing Key is required'] },
    _tenant_fk: { type: String, required: [true, 'Tenant is required'] },
    question: {
        tenant_name: { type: String, required: [true, 'Tenant name is required'] },
        tenant_email: { type: String, required: [true, 'Tenant email is required'] },
        question_date_time: { type: Date, required: [true, 'Question date time is required'] },
        question: { type: String, required: [true, 'Question is required'] },
    },
    answer: {
        type: {
            locator_name: { type: String, required: [true, 'Locator name is required'] },
            locator_email: { type: String, required: [true, 'Locator email is required'] },
            answer_date_time: { type: Date, required: [true, 'Answer date time is required'] },
            answer: { type: String, required: [true, 'Answer is required'] },
        },
        required: false
    },
})

newQuestionAndAnswer.plugin(beautifyUnique, {
    defaultMessage: "There is a problem with the user registration"
});

module.exports = mongoose.model('QuestionAndAnswerModel', newQuestionAndAnswer)