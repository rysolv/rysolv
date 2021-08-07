const bucketNameDictionary = {
  application: process.env.S3_RESUME_BUCKET_NAME,
  image: process.env.S3_IMAGE_BUCKET_NAME,
};

const calculateTotalAmount = amount => (amount * 103 + 30).toFixed();

const responseMessages = {
  unreachable:
    "ERROR: you've reached an unreachable state. Anything is possible. The limits were in our heads all along. Follow your dreams.",
};

module.exports = {
  bucketNameDictionary,
  calculateTotalAmount,
  responseMessages,
};
