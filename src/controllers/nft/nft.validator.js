const Joi = require('joi');

export const addNft = {
  body: {
    name: Joi.string().required(),
    address: Joi.string().required(),
    chainId: Joi.string().required(),
  },
};

export const updateNft = {
  body: {
    name: Joi.string().required(),
    address: Joi.string().required(),
    chainId: Joi.string().required(),
    roundId: Joi.number().required(),
    dropsPrice: Joi.number().required(),
  },
};

export const getNft = {
  body: {
    chainId: Joi.string().required(),
  },
};
