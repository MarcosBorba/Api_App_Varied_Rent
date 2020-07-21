const mongoose = require('mongoose')
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const newAds = new mongoose.Schema({
    _locator_fk: { type: String, required: [true, 'Locator User Ad is required'] },
    title: { type: String, required: [true, 'Title Ad is required'] },
    images: { type: Buffer, required: [true, 'Image Ad is required'] }, // study
    value: { type: String, required: [true, 'Value Ad is required'] },
    description: { type: String, required: [true, 'Description Ad is required'] },
    category: { type: String, required: [true, 'Category Ad is required'] },
})

newAds.plugin(beautifyUnique, {
    defaultMessage: "There is a problem with registering the new ad."
});


module.exports = mongoose.model('AdsModel', newAds)