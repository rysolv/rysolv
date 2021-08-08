const { CustomError } = require('../helpers');
const { uploadFileS3 } = require('./awsConfig');

const uploadFile = async file => {
  const [dataPrefix, base64Data] = file.split(',');
  const type = dataPrefix.match(/^data:([^;]*)/)[1];

  const fileSize = parseInt(file.replace(/=/g, '').length * 0.75, 10);
  if (fileSize >= 1000000) throw new CustomError(`Images must be under 1MB.`);

  const { Location } = await uploadFileS3({
    file: base64Data,
    type,
  });
  return { uploadUrl: Location };
};

module.exports = { uploadFile };
