const services = require('./services');

exports.getAllData = async(req, res) => {
  const result = await services.getAllData();

  return res.status(200).json({
    data: result,
    status: true,
    message: 'All FGCK Malali \'007 Set graduates.'
  })
};