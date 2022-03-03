import { Nft, Sales, Prices } from '../../models';
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
      roundId: 0,
      dropsPrice: 0,
      updatedAt: new Date(),
      createdAt: new Date(),
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

    const nft = await Nft.findByPk({
      id,
    });

    if (nft) {
      await Sales.destry({
        where: {
          nftID: id,
        },
      });
      await Prices.destry({
        where: {
          nftID: id,
        },
      });
      await nft.destry();
    }

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const updateNft = async (req, res) => {
  try {
    const { name, address, roundId, dropsPrice, chainId } = req.body;
    const { id } = req.param;

    const payload = {
      name,
      address,
      chainId,
      roundId,
      dropsPrice,
      updatedAt: new Date(),
    };

    let nft = await Nft.findByPk({
      id,
    });

    if (nft === null) {
      nft = await Nft.create({
        ...payload,
        createdAt: new Date(),
      });
    }

    await nft.update(payload);
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getNft = async (req, res) => {
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
