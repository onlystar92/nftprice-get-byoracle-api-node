const Joi = require('joi');

export const addPrice = {
  body: {
    nftID: Joi.number().required(),
  },
};

export const setPrice = {
  body: {
    nftID: Joi.string().required(),
    usdPrice: Joi.string().required(),
    priceIndex: Joi.number().required(),
  },
};
