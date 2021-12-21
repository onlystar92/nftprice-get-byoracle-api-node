import { Nft, Price } from '../../models';
import { successResponse, errorResponse } from '../../helpers';

export const allNfts = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const limit = 100;
    const nfts = await Nft.findAndCountAll({
      order: [['createdAt', 'DESC']],
      offset: (page - 1) * limit,
      limit,
    });
    return successResponse(req, res, { nfts });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addNft = async (req, res) => {
  try {
    const { name, contract, tokenId } = req.body;

    const nft = await Nft.findOne({
      where: { contract, tokenId, name },
    });

    if (nft) {
      throw new Error('NFT already exists with same contract and tokenId');
    }

    const payload = {
      contract,
      tokenId,
      name,
    };

    await Nft.create(payload);
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const removeNft = async (req, res) => {
  try {
    const { name, contract, tokenId } = req.body;

    const nft = await Nft.findOne({
      where: { contract, tokenId, name },
    });

    if (!nft) {
      throw new Error('NFT not exist');
    }

    const price = await Price.findOne({
      where: { nftID: nft.id },
    });
    await price.destry();

    await nft.destry();

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
