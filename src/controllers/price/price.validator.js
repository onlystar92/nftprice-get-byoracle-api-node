const Joi = require('joi');

export const addPrice = {
  body: {
    nftID: Joi.string().required(),
    usdPrice0: Joi.string().required(),
    usdPrice1: Joi.string().required(),
    usdPrice2: Joi.string().required(),
    usdPrice3: Joi.string().required(),
    usdPrice4: Joi.string().required(),
    usdPrice5: Joi.string().required(),
    usdPrice6: Joi.string().required(),
    usdPrice7: Joi.string().required(),
    etherPrice0: Joi.string().required(),
    etherPrice1: Joi.string().required(),
    etherPrice2: Joi.string().required(),
    etherPrice3: Joi.string().required(),
    etherPrice4: Joi.string().required(),
    etherPrice5: Joi.string().required(),
    etherPrice6: Joi.string().required(),
    etherPrice7: Joi.string().required(),
  },
};

export const setPrice = {
  body: {
    nftID: Joi.string().required(),
    usdPrice0: Joi.string().required(),
    usdPrice1: Joi.string().required(),
    usdPrice2: Joi.string().required(),
    usdPrice3: Joi.string().required(),
    usdPrice4: Joi.string().required(),
    usdPrice5: Joi.string().required(),
    usdPrice6: Joi.string().required(),
    usdPrice7: Joi.string().required(),
    etherPrice0: Joi.string().required(),
    etherPrice1: Joi.string().required(),
    etherPrice2: Joi.string().required(),
    etherPrice3: Joi.string().required(),
    etherPrice4: Joi.string().required(),
    etherPrice5: Joi.string().required(),
    etherPrice6: Joi.string().required(),
    etherPrice7: Joi.string().required(),
  },
};
