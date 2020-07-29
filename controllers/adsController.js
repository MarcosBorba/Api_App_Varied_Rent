const EvaluationModel = require('../models/evaluationModel');
const AdsModel = require('../models/adsModel');
const QuestionModel = require('../models/questionModel');
const ReservationModel = require('../models/reservationModel');
var config = require('../config');
const { ErrorHandler } = require('../controllers/errorHandler');

module.exports = {
    create_ads: async(req, res, next) => {
        try {
            const { _locator_fk, title, images, value, description, category } = req.body;

            const newAds = new AdsModel({
                _locator_fk,
                title,
                images,
                value,
                description,
                category,
            });

            await newAds.save()
                .then(user => {
                    res.status(200).send({ user: user._id, message: 'ads create successfully' });
                })
                .catch(error => {
                    throw new ErrorHandler(500, 'Registration error => ' + error.message)
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
    get_ads_one_user: async(req, res, next) => {
        try {
            let { _locator_fk } = req.body;
            console.log("locator is > ", _locator_fk);
            _locator_fk = "5ebc83a7c2159307500e7f9c";
            const findAdsOneUser = await AdsModel.find({ '_locator_fk': _locator_fk });
            if (findAdsOneUser == null) throw new ErrorHandler(404, "No ads found");
            console.log("find user is > ", findAdsOneUser);
            res.status(200).send({ ads: findAdsOneUser });
        } catch (error) {
            console.log(error.message)
            if (error instanceof ErrorHandler) {
                next(error);
            } else {
                next(new ErrorHandler(500, "Internal Server Error"));
            }
        }
    },
}