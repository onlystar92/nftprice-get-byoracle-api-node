import { Nft } from '../models';

export const successResponse = (req, res, data, code = 200) =>
  res.send({
    code,
    data,
    success: true,
  });

export const errorResponse = (
  req,
  res,
  errorMessage = 'Something went wrong',
  code = 500,
  error = {}
) =>
  res.status(500).json({
    code,
    errorMessage,
    error,
    data: null,
    success: false,
  });

export const checkNFT = async (address, chainId) => {
  let nft = await Nft.findOne({
    where: { address, chainId },
  });
  if (nft === null) {
    nft = await Nft.create({
      name: '',
      chainId,
      address,
      roundId: 0,
      dropsPrice: 0,
      seed: false,
    });
  }
  return nft;
};

export const calcAverage = (arr) => {
  const sum = arr.reduce((a, b) => a + b, 0);
  return sum / arr.length || 0;
};

export const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};
