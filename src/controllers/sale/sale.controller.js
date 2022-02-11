import { Sale, Nft } from '../../models';
import { successResponse, errorResponse } from '../../helpers';

export const addSale = async (req, res) => {
  try {
    const { address, chainId, tokenId, timestamp, usdValue, transactionHash } =
      req.body;

    let nft = await Nft.findOne({
      where: { address, chainId },
    });
    if (nft === null) {
      nft = await Nft.create({
        name: '',
        chainId,
        address,
      });
    }

    // 1. Reached 25 block confirmations.
    // 2. Only 1 NFT is sold within transaction.
    // 3. Same token id was not sold within the last 24 hours.

    const payload = {
      nftID: nft.id,
      tokenId,
      timestamp,
      usdValue,
      transactionHash,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    await Sale.create(payload);

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
