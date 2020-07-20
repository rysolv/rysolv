const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({ region: process.env.AWS_DEFAULT_REGION });

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});

const uploadFileS3 = async ({ file, key = null, type }) => {
  const fileKey = key || `${process.env.S3_BUCKET_NAME}/${uuidv4()}`;
  const fileBuffer = Buffer.from(file, 'base64');
  const payload = {
    Body: fileBuffer,
    Bucket: process.env.S3_BUCKET_NAME,
    ContentEncoding: 'base64',
    ContentType: `image/${type}`,
    Key: fileKey,
  };
  const result = await s3.upload(payload).promise();
  return result;
};

module.exports = {
  uploadFileS3,
};
