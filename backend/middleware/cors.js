const cors = require('cors');
const { FRONTEND_URL } = require('../config');

const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (FRONTEND_URL === origin || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
});

module.exports = corsMiddleware;
