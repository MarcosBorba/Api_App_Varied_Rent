const EvaluationModel = require('../models/evaluationModel');
const AdsModel = require('../models/adsModel');
const QuestionModel = require('../models/questionModel');
const ReservationModel = require('../models/reservationModel');
const { ErrorHandler } = require('../controllers/errorHandler');

module.exports = {
    create_ads: async(req, res, next) => {
        try {
            const { _locator_fk, title, value, description, category } = req.body;
            /* console.log('body >>>>>>>> ')
            console.log('body >>>>>>>> ', req.body)
            console.log('body >>>>>>>> ', req.files) */
            var images = [];
            await req.files.forEach(async function(item) {
                images.push(item.location)
            });

            const result1 = await images.every((item, index, array) => typeof item === 'string' || item instanceof String);
            if (result1 == false) throw new ErrorHandler(500, 'Registration error => erro ao realizar upload de imagens')

            const newAds = new AdsModel({
                _locator_fk,
                title,
                images,
                value,
                description,
                category,
            });
            console.log(newAds)
            await newAds.save()
                .then(user => {
                    res.status(200).send({ user: user._id, message: 'ads create successfully' });
                })
                .catch(async error => {
                    var message = await error.message.substring(error.message.lastIndexOf(": ") + 1, )
                    throw new ErrorHandler(500, 'Registration error =>' + message)
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