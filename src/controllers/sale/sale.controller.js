import { Sale, Nft } from '../../models';
import { successResponse, errorResponse } from '../../helpers';
import { checkSaleIfOutlier, calcDropsMath } from '../../engine/drops';

export const allSales = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const limit = 100;
    const sales = await Sale.findAndCountAll({
      order: [['createdAt', 'DESC']],
      offset: (page - 1) * limit,
      limit,
    });

    return successResponse(req, res, sales);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addSale = async (req, res) => {
  try {
    const {
      address,
      chainId,
      tokenId,
      timestamp,
      etherValue,
      transactionHash,
    } = req.body;

    const currentPrice = parseFloat(etherValue);

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
      });
    }

    // 1. Reached 25 block confirmations.
    // 2. Only 1 NFT is sold within transaction.
    // 3. Same token id was not sold within the last 24 hours.

    const outlier = await checkSaleIfOutlier(nft.id, currentPrice);

    const payload = {
      nftID: nft.id,
      tokenId,
      timestamp: new Date(timestamp * 1000),
      etherValue: currentPrice,
      transactionHash,
      createdAt: new Date(),
      outlier,
    };
    await Sale.create(payload);

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
