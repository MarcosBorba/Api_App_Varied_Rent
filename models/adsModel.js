const mongoose = require('mongoose')
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const newAds = new mongoose.Schema({
    _locator_fk: { type: String, required: [true, 'Locator User Ad is required'] },
    title: { type: String, required: [true, 'Title Ad is required'] },
    images: {
        type: [{ type: String }],
        required: [true, 'Images Ad is required'],
    },
    value: { type: String, required: [true, 'Value Ad is required'] },
    description: { type: String, required: [true, 'Description Ad is required'] },
    category: { type: String, required: [true, 'Category Ad is required'] },
})

newAds.path('images').validate(function(images) {
    console.log(images)
    if (!images) { return false }
    return true;
}, 'error checking image for upload');

newAds.path('images').validate(function(images) {
    if (images.length < 2) { return false }
    return true;
}, `The minimum number of images is 2`);


newAds.plugin(beautifyUnique, {
    defaultMessage: "There is a problem with registering the new ad."
});


module.exports = mongoose.model('AdsModel', newAds)