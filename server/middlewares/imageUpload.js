const request = require('request').defaults({ encoding: null });
const { uploadFileS3 } = require('./awsConfig');
const { isUrl } = require('../helpers');

const base64FromUrl = async url =>
  new Promise((resolve, reject) => {
    request.get(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const data = `data:${
          response.headers['content-type']
        };base64,${Buffer.from(body).toString('base64')}`;
        resolve(data);
      }
      reject(new Error('Unable to parse imported image'));
    });
  }).catch(error => {
    throw error;
  });

const uploadImage = async image => {
  // download base64 if given url
  const data = isUrl(image) ? await base64FromUrl(image) : image;
  // eslint-disable-next-line new-cap
  const base64Data = new Buffer.from(
    data.replace(/^data:image\/\w+;base64,/, ''),
    'base64',
  );
  const fileSize = parseInt(image.replace(/=/g, '').length * 0.75, 10);
  const type = image.split(';')[0].split('/')[1];
  if (fileSize >= 1000000) throw new Error('Images must be under 1MB');

  const { Location } = await uploadFileS3({
    file: base64Data,
    type,
  });
  return { uploadUrl: Location };
};

module.exports = {
  uploadImage,
};
