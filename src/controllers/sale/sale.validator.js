const Joi = require('joi');

export const addSale = {
  body: {
    address: Joi.string().required(),
    tokenId: Joi.string().required(),
    timestamp: Joi.string().required(),
    etherValue: Joi.number().required(),
    transactionHash: Joi.string().required(),
    chainId: Joi.strict().required(),
  },
};
