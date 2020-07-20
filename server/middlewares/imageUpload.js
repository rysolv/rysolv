const { uploadFileS3 } = require('./awsConfig');

const uploadImage = async image => {
  // eslint-disable-next-line new-cap
  const base64Data = new Buffer.from(
    image.replace(/^data:image\/\w+;base64,/, ''),
    'base64',
  );
  const fileSize = parseInt(image.replace(/=/g, '').length * 0.75, 10);
  const type = image.split(';')[0].split('/')[1];
  if (fileSize < 1000000) {
    const { Location } = await uploadFileS3({
      file: base64Data,
      type,
    });
    return { uploadUrl: Location };
  }
  const err = new Error('Images must be under 1MB');
  throw err;
};

module.exports = {
  uploadImage,
};
