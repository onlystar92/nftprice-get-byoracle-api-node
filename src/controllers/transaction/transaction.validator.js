const Joi = require('joi');

export const addTransaction = {
  body: {
    transactionHash: Joi.string().required(),
    contract: Joi.string().required(),
    tokenId: Joi.string().required(),
    timestamp: Joi.string().required(),
    etherValue: Joi.number().required(),
    chainId: Joi.strict().required(),
    from: Joi.strict().required(),
  },
};

export const verifyTransaction = {
  body: {
    transaction_hash: Joi.string().required(),
    block_number: Joi.number().required(),
    block_hash: Joi.string().required(),
    block_timestamp: Joi.number().required(),
    status: Joi.number().required(),
    from: Joi.string().required(),
    to: Joi.string().required(),
    gas_used: Joi.number().required(),
    gas_limit: Joi.number().required(),
    gas_price: Joi.string().required(),
    fee: Joi.string().required(),
    confirmations: Joi.number().required(),
  },
  params: {
    chainId: Joi.number().required(),
  },
};
