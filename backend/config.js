require('dotenv').config();

const {
  NODE_ENV = 'development',
  PORT = '3000',
  BACKEND_URL = 'http://localhost:4000',
  FRONTEND_URL = 'http://localhost:3000',
  DB_HOST = 'localhost',
  DB_PORT = '27017',
  DB_NAME = 'mestodb',
  JWT_SECRET_DEV = 'Ieiefokkefejfkej',
} = process.env;

const DB_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const JWT_SECRET = NODE_ENV === 'production' ? process.env.JWT_SECRET : JWT_SECRET_DEV;
const API_PREFIX = NODE_ENV === 'production' ? '/api' : '';

module.exports = {
  BACKEND_URL,
  FRONTEND_URL,
  PORT,
  DB_URL,
  JWT_SECRET,
  API_PREFIX,
};
