import { Nft, Price } from '../../models';
import { successResponse, errorResponse } from '../../helpers';

export const addPrice = async (req, res) => {
  try {
    const { nftID } = req.body;

    const nft = await Nft.findOne({
      where: { id: nftID },
    });

    if (!nft) {
      throw new Error('NFT not existing');
    }

    const nftPrice = await Price.findOne({
      where: { nftID },
    });

    if (nftPrice) {
      throw new Error('Price already exisitng');
    }

    const payload = {
      nftID,
      usdPrice: '0,0,0,0,0,0,0,0',
      priceIndex: 0,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    await Price.create(payload);
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const setPrice = async (req, res) => {
  try {
    const { nftID, usdPrice, priceIndex } = req.body;

    const price = await Price.findOne({
      where: { nftID },
    });

    if (!price) {
      throw new Error('Price Not Exist');
    }

    await price.update({
      usdPrice,
      priceIndex,
      updatedAt: new Date(),
    });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
