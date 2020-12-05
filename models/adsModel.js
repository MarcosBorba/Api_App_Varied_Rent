const mongoose = require('mongoose')
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const aws = require("aws-sdk");
aws.config.region = process.env.AWS_DEFAULT_REGION;
const s3 = new aws.S3({ region: process.env.AWS_DEFAULT_REGION, accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY });

const newAds = new mongoose.Schema({
    _locator_fk: { type: String, required: [true, 'Locator User Ad is required'] },
    title: { type: String, required: [true, 'Title Ad is required'] },
    images: {
        type: [{
            url: { type: String, required: [true, 'url is required'] },
            key: { type: String, required: [true, 'key is required'] },
        }],
        required: [true, 'Images Ad is required'],
    },
    starsEvaluations: { type: [Number] },
    value: { type: String, required: [true, 'Value Ad is required'] },
    description: { type: String, required: [true, 'Description Ad is required'] },
    category: { type: String, required: [true, 'Category Ad is required'] },
})

newAds.pre("remove", async function() {
    var deleteParam = {
        Bucket: process.env.BUCKET_NAME,
        Delete: {
            Objects: []
        }
    };

    await this.images.forEach(async function(item) {
        deleteParam.Delete.Objects.push({ Key: item.key })
    });

    if (process.env.STORAGE_TYPE === "s3") {
        return s3.deleteObjects(
            deleteParam,
            function(err, data) {
                if (err) console.log(err, err.stack);
                else console.log(data);
            }
        ).promise().then(response => {
            console.log("response.status then");
            console.log(response);
        }).catch(response => {
            console.log("response.status catch error");
            console.log(response);
        });
    } else {
        return promisify(fs.unlink)(
            path.resolve(__dirname, "..", "uploads", this.key)
        );
    }
});

newAds.path('images').validate(function(images) {
    console.log(images)
    if (!images) { return false }
    return true;
}, 'error checking image for upload');

/* newAds.path('images').validate(function(images) {
    if (images.length < 2) { return false }
    return true;
}, `The minimum number of images is 2`); */


newAds.plugin(beautifyUnique, {
    defaultMessage: "There is a problem with registering the new ad."
});


module.exports = mongoose.model('AdsModel', newAds)