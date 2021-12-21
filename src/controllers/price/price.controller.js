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
      usdPrice0: '0',
      usdPrice1: '0',
      usdPrice2: '0',
      usdPrice3: '0',
      usdPrice4: '0',
      usdPrice5: '0',
      usdPrice6: '0',
      usdPrice7: '0',
      etherPrice0: '0',
      etherPrice1: '0',
      etherPrice2: '0',
      etherPrice3: '0',
      etherPrice4: '0',
      etherPrice5: '0',
      etherPrice6: '0',
      etherPrice7: '0',
    };

    await Price.create(payload);
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const setPrice = async (req, res) => {
  try {
    const {
      nftID,
      usdPrice0,
      usdPrice1,
      usdPrice2,
      usdPrice3,
      usdPrice4,
      usdPrice5,
      usdPrice6,
      usdPrice7,
      etherPrice0,
      etherPrice1,
      etherPrice2,
      etherPrice3,
      etherPrice4,
      etherPrice5,
      etherPrice6,
      etherPrice7,
    } = req.body;

    const price = await Price.findOne({
      where: { nftID },
    });

    if (!price) {
      throw new Error('Price Not Exist');
    }

    await price.update({
      usdPrice0,
      usdPrice1,
      usdPrice2,
      usdPrice3,
      usdPrice4,
      usdPrice5,
      usdPrice6,
      usdPrice7,
      etherPrice0,
      etherPrice1,
      etherPrice2,
      etherPrice3,
      etherPrice4,
      etherPrice5,
      etherPrice6,
      etherPrice7,
    });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
