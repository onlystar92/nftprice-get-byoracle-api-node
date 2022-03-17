const Joi = require('joi');

export const insertSale = {
  body: {
    transactionHash: Joi.string().required(),
    contract: Joi.string().required(),
    tokenId: Joi.string().required(),
    chainId: Joi.strict().required(),
    blockTimestamp: Joi.string().required(),
    etherValue: Joi.string().required(),
    from: Joi.strict().required(),
    to: Joi.strict().required(),
    datetime: Joi.strict().required(),
  },
};
