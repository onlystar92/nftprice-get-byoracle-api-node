const Joi = require('joi');

export const addNft = {
  body: {
    name: Joi.string().required(),
    contract: Joi.string().required(),
  },
};

export const removeNft = {
  body: {
    name: Joi.string().required(),
    contract: Joi.string().required(),
  },
};
