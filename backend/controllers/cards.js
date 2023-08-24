const card = require('../models/card');
const statuses = require('../utils/statuses');
const handleError = require('../middleware/errorHandler');
const { sendResponse } = require('../utils/sendResponse');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;

  card.create({ name, link, owner })
    .then((newCard) => card.findById(newCard._id).populate('owner'))
    .then((newCard) => sendResponse(res, newCard, statuses.CREATED))
    .catch((err) => handleError(err, res));
};

module.exports.deleteCard = (req, res) => {
  card.findByIdAndRemove(req.params.cardId)
    .then((data) => {
      if (!data) {
        return sendResponse(res, { message: statuses.CARD_NOT_FOUND }, statuses.NOT_FOUND);
      }
      if (data.owner.toString() !== req.user._id) {
        return sendResponse(res, { message: statuses.FORBIDDEN_MESSAGE }, statuses.FORBIDDEN);
      }
      return sendResponse(res, { message: statuses.CARD_DELETED });
    })
    .catch((err) => handleError(err, res));
};

module.exports.getCards = (req, res) => {
  card.find({}).select('-__v')
    .populate([
      { path: 'owner', select: '-__v' },
      { path: 'likes', select: '-__v' },
    ])
    .sort('-createdAt')
    .then((data) => sendResponse(res, data))
    .catch((err) => handleError(err, res));
};

module.exports.getCardById = (req, res) => {
  card.findById(req.params.cardId)
    .populate([
      { path: 'owner', select: '-__v' },
      { path: 'likes', select: '-__v' },
    ])
    .then((data) => {
      if (!data) {
        return sendResponse(res, { message: statuses.CARD_NOT_FOUND }, statuses.NOT_FOUND);
      }
      return sendResponse(res, data);
    })
    .catch((err) => handleError(err, res));
};

// Поставить лайк карточке
exports.likeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate([
      { path: 'owner', select: '-__v' },
      { path: 'likes', select: '-__v' },
    ])
    .then((data) => {
      if (!data) {
        return sendResponse(res, { message: statuses.CARD_NOT_FOUND }, statuses.NOT_FOUND);
      }
      return sendResponse(res, data);
    })
    .catch((err) => handleError(err, res));
};

exports.dislikeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate([
      { path: 'owner', select: '-__v' },
      { path: 'likes', select: '-__v' },
    ])
    .then((data) => {
      if (!data) {
        return sendResponse(res, { message: statuses.CARD_NOT_FOUND }, statuses.NOT_FOUND);
      }
      return sendResponse(res, data);
    })
    .catch((err) => handleError(err, res));
};
