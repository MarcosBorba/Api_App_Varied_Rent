const EvaluationModel = require('../models/evaluationModel');
var config = require('../config');
const { ErrorHandler } = require('../controllers/errorHandler');

module.exports = {
    add_add: async(req, res, next) => {
        try {
            const { _ad_fk, _user_fk, user_name, user_email, amount_stars, objective_opition, opinion, evaluation_date } = req.body;

            const newEva = new EvaluationModel({
                _ad_fk,
                _user_fk,
                user_name,
                user_email,
                amount_stars,
                objective_opition,
                opinion,
                evaluation_date
            });

            await newEva.save()
                .then(user => {
                    res.status(200).send({ message: 'create successfully' });
                })
                .catch(error => {
                    throw new ErrorHandler(500, 'Registration error => ' + Object.values(error.errors)[0].properties.message)
                })
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