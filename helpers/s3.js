const aws = require('aws-sdk');
const { HEAVEN_AWS_ACCESS_KEY_ID, HEAVEN_AWS_SECRET_ACCESS_KEY, HEAVEN_AWS_BUCKET_REGION } = process.env;

const s3Bucket = new aws.S3({
    credentials: {
        "accessKeyId": HEAVEN_AWS_ACCESS_KEY_ID,
        "secretAccessKey": HEAVEN_AWS_SECRET_ACCESS_KEY,
        "region":HEAVEN_AWS_BUCKET_REGION
    }
});

module.exports = s3Bucket;