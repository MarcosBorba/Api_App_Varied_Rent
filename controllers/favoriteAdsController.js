const FavoriteAdsModel = require('../models/favoriteAdsModel');
const AdsModel = require('../models/adsModel');
const { ErrorHandler } = require('../controllers/errorHandler');

module.exports = {
    add_favorite_ad: async(req, res, next) => {
        try {
            const { _ad_fk, _locator_fk } = req.body;

            const newFavoriteAd = new FavoriteAdsModel({
                _ad_fk,
                _locator_fk,
            });
            //5fcefdb9d4048a0e3c2f3577
            await newFavoriteAd.save()
                .then(favorite => {
                    res.status(200).send({ favorite: favorite._id, message: 'favorite ad add successfully' });
                })
                .catch(async error => {
                    console.log("error message pure", error.message);
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
    get_favorite_ad_one_user: async(req, res, next) => {
        try {
            let { _locator_fk } = req.query;
            let ids = [];
            console.log('body query ', req.query)
            const findFavoriteAdsOneUser = await FavoriteAdsModel.find({ '_locator_fk': _locator_fk });
            if (findFavoriteAdsOneUser == null) throw new ErrorHandler(404, "No favorite ads found");
            console.log("find favorite ad is > ", findFavoriteAdsOneUser);
            await findFavoriteAdsOneUser.forEach(async function(item) {
                ids.push(item._ad_fk);
            });
            console.log("id ads > ", ids);
            //await Model.find().where('_id').in(ids).exec();
            await AdsModel.find().where('_id').in(ids).exec()
                .then(ads => {
                    console.log("ads ", ads);
                    res.status(200).send({ ads: ads, message: 'find ads successfully' });
                })
                .catch(async error => {
                    console.log("error message pure get ", error.message);
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
    delete_favorite_ad: async(req, res, next) => {
        try {
            var { _ad_fk, _locator_fk } = req.query;
            console.log("query delete favorite", req.query)

            await FavoriteAdsModel.findOneAndDelete({ '_ad_fk': _ad_fk, '_locator_fk': _locator_fk })
                .then(user => {
                    res.status(200).send({ message: "favorite ad deleted, ok!" });
                })
                .catch(async error => {
                    throw new ErrorHandler(400, "No favorite ad deleted");
                });

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