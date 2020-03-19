const config = require('config')
const AWS = require('aws-sdk')
const { tap } = require('ramda')

const s3 = new AWS.S3({region: config.s3.region})

const upload_file = (buffer, rss_id) => {
    let params = {
        ACL: "public-read",
        Body: buffer,
        Bucket: config.s3.bucket,
        Key: rss_id,
    }
    return s3.upload(params).promise()
}

module.exports = {
    upload_file,
}
