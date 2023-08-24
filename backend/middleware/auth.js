const jwt = require('jsonwebtoken');
const handleError = require('./errorHandler');
const { UNAUTHORIZED } = require('../utils/statuses');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return handleError({ statusCode: UNAUTHORIZED }, res);
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    return handleError(err, res);
  }
};
