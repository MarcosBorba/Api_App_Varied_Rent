const EvaluationModel = require('../models/evaluationModel');
const AdsModel = require('../models/adsModel');
const { ErrorHandler } = require('../controllers/errorHandler');

module.exports = {
    add_evaluation: async(req, res, next) => {
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
                .then(async user => {
                    let updateAds = await AdsModel.findOneAndUpdate({ '_id': user._ad_fk }, {
                        $push: {
                            'starsEvaluations': newEva.amount_stars,
                        }
                    });
                    if (updateAds == null) throw new ErrorHandler(404, "Error on insert Evaluation");
                    res.status(200).send({ message: 'create successfully', id: user._id, updateAds: updateAds });
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
    },
    get_evaluations_one_ad: async(req, res, next) => {
        try {
            let { _ad_fk } = req.query;
            console.log('body', req.query)
            console.log('ad fk = ', _ad_fk)
            const findEvaluationsOneAd = await EvaluationModel.find({ '_ad_fk': _ad_fk });
            if (findEvaluationsOneAd == null) throw new ErrorHandler(404, "No Evaluations ad found");
            console.log("find evaluations is > ", findEvaluationsOneAd);
            res.status(200).send({ evaluation: findEvaluationsOneAd });
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