import { Nft, Sale, Price, Transaction } from '../../models';
import { successResponse, errorResponse } from '../../helpers';

export const allNfts = async (req, res) => {
  try {
    const page = req.query.page || 1;

    const limit = 100;
    const { rows } = await Nft.findAndCountAll({
      order: [['createdAt', 'DESC']],
      offset: (page - 1) * limit,
      limit,
    });

    return successResponse(req, res, rows);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addNft = async (req, res) => {
  try {
    const { chainId, address, name } = req.body;

    const nft = await Nft.findOne({
      where: { name, address, chainId },
    });

    if (nft) {
      return errorResponse(
        req,
        res,
        'NFT already exists with same contract on the same network'
      );
    }

    const payload = {
      name,
      address,
      chainId,
      roundId: 1,
      dropsPrice: 0,
      truncatedMean: 0,
      updatedAt: new Date(),
      createdAt: new Date(),
      seed: false,
    };

    await Nft.create(payload);

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const removeNft = async (req, res) => {
  try {
    const { id } = req.params;

    const nft = await Nft.findByPk(id);

    if (nft) {
      await Sale.destroy({
        where: {
          nftId: id,
        },
      });

      await Price.destroy({
        where: {
          nftId: id,
        },
      });
      await nft.destroy();
    }

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const updateNft = async (req, res) => {
  try {
    const { name, address, chainId } = req.body;
    const { id } = req.params;

    let nft = await Nft.findByPk(id);

    if (nft === null) {
      nft = await Nft.create({
        ...payload,
        createdAt: new Date(),
      });
    }

    const payload = {
      name,
      address,
      chainId,
      roundId: nft.roundId,
      dropsPrice: nft.dropsPrice,
      updatedAt: new Date(),
    };

    await nft.update(payload);
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getNft = async (req, res) => {
  try {
    const { id } = req.params;

    let nft = await Nft.findByPk(id);

    if (nft) {
      return successResponse(req, res, nft);
    }

    return errorResponse(req, res, 'Not Found');
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getPrice = async (req, res) => {
  try {
    const { chainId, address } = req.query;

    const nft = await Nft.findOne({
      where: { address, chainId },
    });

    if (nft) {
      return successResponse(req, res, {
        // name: nft.name,
        // address,
        // chainId,
        // roundId: nft.roundId,
        dropsEtherValue: nft.dropsPrice,
      });
    }

    return errorResponse(req, res, 'Not Found');
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
