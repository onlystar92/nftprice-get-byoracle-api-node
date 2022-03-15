import cron from 'node-cron';

import { Nft, Price } from '../models';
import { calcDropsMath } from './drops';
import { calcAverage } from '../helpers';

////////////////////////////////////////////////////////////////////////////////////////
/// calculate price every 4 hours using Drops oracle logic
////////////////////////////////////////////////////////////////////////////////////////
export const calculateDropsFloorPrice = async () => {
  console.log('===>calculateDropsFloorPrice');
  const allNfts = await Nft.findAll();

  for (let i = 0; i < allNfts.length; i++) {
    const nft = allNfts[i];
    if (nft && nft.seed) {
      const newPrice = await calcDropsMath(
        nft.id,
        2,
        6,
        10,
        0.2,
        nft.truncatedMean
      );

      if (newPrice > 0) {
        await Price.create({
          nftId: nft.id,
          etherValue: newPrice,
          roundId: nft.roundId,
          source: 'drops',
        });
      }
    }
  }
};
export const updateDropsFloorPriceCronJob = cron.schedule(
  '0 */4 * * *',
  async () => {
    try {
      await calculateDropsFloorPrice();
    } catch (e) {
      console.log(e);
    }
  }
);

////////////////////////////////////////////////////////////////////////////////////////
/// calculate drops Price with 6 price data using TWAP every day
////////////////////////////////////////////////////////////////////////////////////////
export const calculateDropsTWAPValue = async () => {
  console.log('===>calculateDropsTWAPValue');
  const allNfts = await Nft.findAll();

  for (let i = 0; i < allNfts.length; i++) {
    const nft = allNfts[i];

    if (nft && nft.seed) {
      const roundId = nft.roundId;

      const prices = await Price.findAll({
        where: {
          roundId,
          nftId: nft.id,
        },
      }).map((p) => p.etherValue);

      await nft.update({
        ...nft,
        roundId: nft.roundId + 1,
        dropsPrice: calcAverage(prices),
      });
    }
  }
};
export const updateDropsTWAPValueCronJob = cron.schedule(
  '0 0 * * *',
  async () => {
    try {
      await calculateDropsTWAPValue();
    } catch (e) {
      console.log(e);
    }
  }
);
