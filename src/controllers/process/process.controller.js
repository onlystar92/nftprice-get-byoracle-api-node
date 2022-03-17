import { Nft, Sale } from '../../models';
import { successResponse, errorResponse } from '../../helpers';
import { updateTruncatedMean } from '../../engine/truncate';
import {
  calculateDropsFloorPrice,
  calculateDropsTWAPValue,
} from '../../engine/cron';
import seedData from '../../../data/seed';

export const calcFloorPrice = async (req, res) => {
  try {
    await calculateDropsFloorPrice();

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const calcTWAPPrice = async (req, res) => {
  try {
    await calculateDropsTWAPValue();

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const seedSales = async (req, res) => {
  try {
    const allNfts = await Nft.findAll();

    for (let i = 0; i < allNfts.length; i++) {
      const nft = allNfts[i];
      const dataKey = `${nft.name}_${nft.chainId}`;
      console.log('===>dataKey', dataKey);

      if (!nft.seed) {
        if (seedData[dataKey]) {
          const rawData = seedData[dataKey].map((item) => {
            const newItem = {
              nftId: nft.id,
              tokenId: item.tokenId,
              blockTimestamp: item.blockTimestamp,
              etherValue: item.sellPrice,
              transactionHash: item.transactionHash || '',
              from: item.from || '',
              to: item.from || '',
              extreamOutlier: false,
              sameTokenIDSold: false,
              blockConfirmed: true,
            };
            return newItem;
          });
          console.log('===>rawData', rawData.length);

          if (rawData.length > 0) {
            await Sale.bulkCreate(rawData, {
              updateOnDuplicate: ['transactionHash'],
            });
            await updateTruncatedMean(nft.id);
            await nft.update({
              ...nft,
              seed: true,
            });
          }
        }
      }
    }

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const insertSale = async (req, res) => {
  try {
    const {
      transactionHash,
      contract,
      chainId,
      tokenId,
      blockTimestamp,
      etherValue,
      from,
      to,
    } = req.body;

    const nft = await checkNFT(contract, chainId);

    const sale = await Sale.findOne({
      where: { transactionHash, nftId: nft.id },
    });

    if (sale !== null) {
      return errorResponse(req, res, 'Sale already exists ');
    }

    await addSaleWithVerification(
      nftId,
      tokenId,
      blockTimestamp,
      etherValue,
      transactionHash,
      from,
      to,
      true,
      false // sameTokenIDSold
    );

    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
