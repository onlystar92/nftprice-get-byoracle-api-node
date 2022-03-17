const Joi = require('joi');

export const addSaleFromParsiq = {
  body: {
    transactionHash: Joi.string().required(),
    contract: Joi.string().required(),
    chainId: Joi.strict().required(),
    from: Joi.string().required(),
    to: Joi.string().required(),
    tokenId: Joi.string().required(),
    etherValue: Joi.string().required(),
    datetime: Joi.string().required(),
  },
};

export const verifyTransaction = {
  query: {
    saleId: Joi.string().required(),
  },
};
