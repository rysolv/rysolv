const { CustomError } = require('../helpers');
const { retrieveFileS3, uploadFileS3 } = require('./awsConfig');

const retrieveFile = async ({ key }) => {
  const type = 'text';
  const { Body, ContentType } = await retrieveFileS3({ key, type });
  return {
    contentType: ContentType,
    file: Body.toString('base64'),
  };
};

const uploadFile = async ({ file, fileExtension }) => {
  const [dataPrefix, base64Data] = file.split(',');
  const type = dataPrefix.match(/^data:([^;]*)/)[1];

  const fileSize = parseInt(file.replace(/=/g, '').length * 0.75, 10);
  if (fileSize >= 1000000) throw new CustomError(`Images must be under 1MB.`);

  if (process.env.AWS_ACCESS_KEY && process.env.AWS_SECRET) {
    const { Location } = await uploadFileS3({
      file: base64Data,
      fileExtension,
      type,
    });
    return { uploadUrl: Location };
  }
  return { uploadUrl: 'https://i.redd.it/scqsx52g8jo31.jpg' };
};

module.exports = { retrieveFile, uploadFile };
