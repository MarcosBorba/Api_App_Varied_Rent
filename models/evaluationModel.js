const mongoose = require('mongoose')
mongoose.set('debug', true)
const beautifyUnique = require('mongoose-beautiful-unique-validation');
//TODO: mudar no backend e frontend para trabalhar com do usuario
// para verificar relacoes do usuario com os anuncios e seus sub servicos
const newEvaluation = new mongoose.Schema({
    _ad_fk: { type: Number, required: [true, 'Ad Foreing Key is required'] },
    _user_fk: { type: Number, required: [true, 'Ad User Key is required'] },
    user_name: { type: String, required: [true, 'User Name Evaluator is required'] },
    user_email: { type: String, required: [true, 'User Email Evaluator is required'], },
    amount_stars: { type: Number, required: [true, 'amount_stars is required'] },
    objective_opition: { type: String, required: [true, 'objective_opition is required'] },
    opinion: { type: String, required: [true, 'opinion is required'] },
    evaluation_date: { type: Date, required: [true, 'evaluation_date is required'] }, //numero de registro brasileiro

}).index({ _ad_fk: 1, _user_fk: 1 }, { unique: 'The user has already rated this ad' });

newEvaluation.plugin(beautifyUnique, {
    defaultMessage: "There is a problem with the user registration"
});

module.exports = mongoose.model('EvaluationModel', newEvaluation)