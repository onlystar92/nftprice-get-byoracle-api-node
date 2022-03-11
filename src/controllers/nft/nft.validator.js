const Joi = require('joi');

export const addNft = {
  body: {
    name: Joi.string().required(),
    address: Joi.string().required(),
    chainId: Joi.string().required(),
  },
};

export const removeNft = {
  params: {
    id: Joi.string().required(),
  },
};

export const updateNft = {
  body: {
    name: Joi.string().required(),
    address: Joi.string().required(),
    chainId: Joi.string().required(),
  },
  params: {
    id: Joi.string().required(),
  },
};

export const getNft = {
  params: {
    id: Joi.string().required(),
  },
};

export const getPrice = {
  query: {
    chainId: Joi.string().required(),
    address: Joi.string().required(),
  },
};
