const mongoose = require('mongoose')

const newFavoriteAd = new mongoose.Schema({
    _ad_fk: { type: String, required: [true, 'Ad Fk is required'] },
    _locator_fk: { type: String, required: [true, 'Locator User Ad is required'] },
})

module.exports = mongoose.model('FavoriteAdsModel', newFavoriteAd)