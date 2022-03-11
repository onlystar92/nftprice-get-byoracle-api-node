import { Nft, Sale } from '../../models';
import { successResponse, errorResponse, checkNFT } from '../../helpers';
import { calcDropsMath } from '../../engine/drops';
import seedData from '../../../data/seed';

export const calcFloorPrice = async (req, res) => {
  const allNfts = await Nft.findAll();

  for (let i = 0; i < allNfts.length; i++) {
    const nft = allNfts[i];

    if (nft.seed) {
      const newPrice = await calcDropsMath(nft.id);

      console.log('====>newPrice', newPrice);
      // if (newPrice > 0) {
      //   await Price.create({
      //     nftId: nft.id,
      //     etherValue: newPrice,
      //     roundId: nft.roundId,
      //     source: 'drops',
      //   });
      // }
    }
  }

  console.log('===>calcDropsFloorPrice');
  return successResponse(req, res, {});
};

export const seedSales = async (req, res) => {
  try {
    const allNfts = await Nft.findAll();

    for (let i = 0; i < allNfts.length; i++) {
      const nft = allNfts[i];

      if (!nft.seed) {
        const { name } = nft;

        if (seedData[name]) {
          const rawData = seedData[name].map((item) => {
            const newItem = {
              nftId: nft.id,
              tokenId: item.tokenId,
              blockTimestamp: item.blockTimestamp,
              etherValue: item.sellPrice,
              transactionHash: item.transactionHash || '',
              from: item.from || '',
              to: item.from || '',
              outlier: false,
              sameTokenIDSold: false,
              blockConfirmed: true,
            };
            return newItem;
          });

          if (rawData.length > 0) {
            await Sale.bulkCreate(rawData).then(async () => {
              await nft.update({
                ...nft,
                seed: true,
              });
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
