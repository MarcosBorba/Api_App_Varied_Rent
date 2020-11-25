const EvaluationModel = require('../models/evaluationModel');
const AdsModel = require('../models/adsModel');
const QuestionModel = require('../models/questionAndAnswerModel');
const ReservationModel = require('../models/reservationModel');
const { ErrorHandler } = require('../controllers/errorHandler');

module.exports = {
    create_ads: async(req, res, next) => {
        try {
            const { _locator_fk, title, value, description, category } = req.body;
            console.log('body >>>>>>>> ')
            console.log('body >>>>>>>> ', req.body)
            console.log('body >>>>>>>> ', req.files)
            var images = [];
            await req.files.forEach(async function(item) {
                images.push({ url: item.location, key: item.key })
            });
            console.log(images)

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
            let { _locator_fk } = req.query;
            //console.log('body', req.query)
            const findAdsOneUser = await AdsModel.find({ '_locator_fk': _locator_fk });
            if (findAdsOneUser == null) throw new ErrorHandler(404, "No ads found");
            //console.log("find user is > ", findAdsOneUser);
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
    delete_ads: async(req, res, next) => {
        try {
            var { _id } = req.query;
            console.log(req.query)
                /* const findAds = await AdsModel.findOne({ '_id': _id });
                if (findAds == null) throw new ErrorHandler(404, "No ads found");
                AdsModel.deleteOne(findAds, function(err) {
                    if (err) {
                        console.log(err);
                        throw new ErrorHandler(400, "No ads deleted")
                    }
                    console.log("Successful deletion");
                }); */

            const adsModel = await AdsModel.findById(_id);

            await adsModel.remove(function(err) {
                if (err) {
                    console.log(err);
                    throw new ErrorHandler(400, "No ads deleted")
                }
                console.log("Successful deletion");
            });

            res.status(200).send({ message: "ads deleted, ok!" });
        } catch (error) {
            console.log(error.message)
            if (error instanceof ErrorHandler) {
                console.log(error.message)
                next(error);
            } else {
                next(new ErrorHandler(500, "Internal Server Error"));
            }
        }
    },
}