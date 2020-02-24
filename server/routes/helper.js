/**
 * @description send data passed along in request object back to client side
 *
 * @param {object} request, response
 * @return {void}
 */
const responseData = (req, res) => {
  const { data } = req;
  res.json(data);
};

module.exports = { responseData };
