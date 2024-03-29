const UserModel = require('../models/userModel');
const FavoriteAdsModel = require('../models/favoriteAdsModel');
const QuestionAndAnswerModel = require('../models/questionAndAnswerModel');
const EvaluationModel = require('../models/evaluationModel');
const AdsModel = require('../models/adsModel');
const ReservationModel = require('../models/reservationModel');
const { ErrorHandler } = require('../controllers/errorHandler');

module.exports = {
    create_ads: async(req, res, next) => {
        try {
            const { _locator_fk, title, value, description, category } = req.body;
            //console.log('body >>>>>>>> ')
            //console.log('body >>>>>>>> ', req.body)
            //console.log('body >>>>>>>> ', req.files)
            var images = [];
            await req.files.forEach(async function(item) {
                images.push({ url: item.location, key: item.key })
            });
            //console.log(images)

            const newAds = new AdsModel({
                _locator_fk,
                title,
                images,
                value,
                description,
                category,
            });
            //console.log(newAds)
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
            console.log("query delete ", req.query)
                //console.log("req delete ", req)
                /* const findAds = await AdsModel.findOne({ '_id': _id });
                if (findAds == null) throw new ErrorHandler(404, "No ads found");
                AdsModel.deleteOne(findAds, function(err) {
                    if (err) {
                        console.log(err);
                        throw new ErrorHandler(400, "No ads deleted")
                    }
                    console.log("Successful deletion");
                }); */
            const findEvaluations = await EvaluationModel.find({ '_ad_fk': _id });
            const findQuestionsAndAnswers = await QuestionAndAnswerModel.find({ '_ad_fk': _id });


            if (findEvaluations != null) {
                console.log("findEvaluations ", findEvaluations)
                await findEvaluations.forEach(async function(item) {
                    console.log("item -> ", item);
                    item.remove()
                        .then(user => {
                            console.log("Successful evaluation deletion");
                        })
                        .catch(async error => {
                            throw new ErrorHandler(400, "No Evaluation deleted");
                        });

                });
            }
            if (findQuestionsAndAnswers != null) {
                console.log("findQuestionsAnswers ", findQuestionsAndAnswers);
                await findQuestionsAndAnswers.forEach(async function(item) {
                    item.remove()
                        .then(user => {
                            console.log("Successful Question And Answer deletion");
                        })
                        .catch(async error => {
                            throw new ErrorHandler(400, "No Question And Answer deleted");
                        });
                });

            }

            const adsModel = await AdsModel.findById(_id);
            console.log("findAds ", adsModel);
            await adsModel.remove()
                .then(user => {
                    res.status(200).send({ message: "ads deleted, ok!" });
                })
                .catch(async error => {
                    throw new ErrorHandler(400, "No ads deleted");
                });

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
    update_ads: async(req, res, next) => {
        try {
            const { _id, title, value, description, category, imagesAwsRemove } = req.body;
            //console.log('body >>>>>>>> ', req.body)
            //console.log('body >>>>>>>> ', req.files)
            var images = [];
            var imagesRemoveDataBase = await JSON.parse(imagesAwsRemove);
            await req.files.forEach(async function(item) {
                images.push({ url: item.location, key: item.key })
            });
            if (imagesRemoveDataBase.length > 0) {
                await AdsModel.updateOne({ '_id': _id }, {
                    $pull: {
                        'images': {
                            _id: imagesRemoveDataBase
                        }
                    },
                    function(err, data) {
                        console.log("error functions ");

                        if (err) {
                            throw new ErrorHandler(400, "Image database not deleted");
                        }
                    }
                });
            }


            await AdsModel.findOneAndUpdate({ '_id': _id }, {
                    $set: {
                        'title': title,
                        'value': value,
                        'description': description,
                        'category': category,
                    },
                    $push: {
                        'images': images,
                    }
                }).then(user => {
                    res.status(200).send({ msg: "updated ad successfully" });
                })
                .catch(error => {
                    res.status(400).send({ msg: "unsuccessful ad update" });
                });
        } catch (error) {
            console.log("############################################# ", error.message)
            if (error instanceof ErrorHandler) {
                next(error);
            } else {
                next(new ErrorHandler(500, "Internal Server Error"));
            }
        }

    },
    get_info_ad: async(req, res, next) => {
        try {
            let { _ad_fk, _user_id, _locator_fk } = req.query;
            //console.log('query ->>> ', req.query)
            let userLocator;
            let favoriteAd;
            let questionsAndAnswers;
            let evaluations;
            //user
            await UserModel.findOne({ '_id': _locator_fk })
                .then(user => {
                    userLocator = user;
                })
                .catch(async error => {
                    throw new ErrorHandler(404, "Error fetching ad");
                });
            //favorite
            await FavoriteAdsModel.find({ '_ad_fk': _ad_fk, '_locator_fk': _user_id })
                .then(favorite => {
                    favoriteAd = true;
                })
                .catch(async error => {
                    throw new ErrorHandler(404, "Error fetching favorite ad");
                });
            //questions and answers
            await QuestionAndAnswerModel.find({ '_ad_fk': _ad_fk }).sort({ _id: -1 })
                .then(questionsAnswers => {
                    questionsAndAnswers = questionsAnswers;
                })
                .catch(async error => {
                    throw new ErrorHandler(404, "Error fetching Questions and answers ad");
                });
            //evaluations
            await EvaluationModel.find({ '_ad_fk': _ad_fk })
                .then(evaluation => {
                    evaluations = evaluation;
                })
                .catch(async error => {
                    throw new ErrorHandler(404, "Error fetching Evaluations ad");
                });

            res.status(200).send({
                question_and_answer: questionsAndAnswers,
                userLocator: userLocator,
                favoriteAd: favoriteAd,
                evaluation: evaluations,
            });
        } catch (error) {
            console.log("error on controller ->>>> ", error.message)
            if (error instanceof ErrorHandler) {
                next(error);
            } else {
                next(new ErrorHandler(500, "Internal Server Error"));
            }
        }
    },
}