const request = require('request').defaults({ encoding: null });

const { CustomError, isUrl } = require('../helpers');
const { uploadFileS3 } = require('./awsConfig');

const base64FromUrl = async url =>
  new Promise((resolve, reject) => {
    request.get(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const data = `data:${
          response.headers['content-type']
        };base64,${Buffer.from(body).toString('base64')}`;
        resolve(data);
      }
      reject(new CustomError(`Imported image cannot be parsed.`));
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
  if (fileSize >= 1000000) throw new CustomError(`Images must be under 1MB.`);

  if (process.env.AWS_ACCESS_KEY && process.env.AWS_SECRET) {
    const { Location } = await uploadFileS3({
      file: base64Data,
      type: `image/${type}`,
    });
    return { uploadUrl: Location };
  }
  return { uploadUrl: 'https://i.redd.it/scqsx52g8jo31.jpg' };
};

module.exports = { uploadImage };
