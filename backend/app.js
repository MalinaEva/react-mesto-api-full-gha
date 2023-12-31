require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { DB_URL, API_PREFIX, PORT } = require('./config');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { sendResponse } = require('./utils/sendResponse');
const { NOT_FOUND, NOT_FOUND_MESSAGE } = require('./utils/statuses');
const { login, createUser } = require('./controllers/users');
const validateRequest = require('./middleware/validateRequest');
const { loginValidationSchema, registerValidationSchema } = require('./validations/userValidations');
const { requestLogger, errorLogger } = require('./middleware/logger');
const corsConfig = require('./utils/corsConfig');
const rateLimitConfig = require('./utils/rateLimitConfig');

const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(rateLimit(rateLimitConfig));

const apiRouter = express.Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/cards', cardsRouter);
apiRouter.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
apiRouter.post('/signin', validateRequest(loginValidationSchema), login);
apiRouter.post('/signup', validateRequest(registerValidationSchema), createUser);
apiRouter.use((req, res) => sendResponse(res, { message: NOT_FOUND_MESSAGE }, NOT_FOUND));

app.use(API_PREFIX, apiRouter);
app.use(errorLogger);
app.use(errors());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту ${PORT}`);
});
