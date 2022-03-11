import cron from 'node-cron';

import { Nft, Price } from '../models';
import { calcDropsMath } from './drops';
import { calcAverage } from '../helpers';

////////////////////////////////////////////////////////////////////////////////////////
/// calculate price every 4 hours using Drops oracle logic
////////////////////////////////////////////////////////////////////////////////////////
const updateDropsPrice = crons.schedule('0 0 */4 * * *', async () => {
  const allNfts = await Nft.findAll();

  for (let i = 0; i < allNfts.length; i++) {
    const nft = allNfts[i];
    const newPrice = await calcDropsMath(nft.id);

    if (newPrice > 0) {
      await Price.create({
        nftId: nft.id,
        etherValue: newPrice,
        roundId: nft.roundId,
        source: 'drops',
      });
    }
  }
});

////////////////////////////////////////////////////////////////////////////////////////
/// calculate drops Price with 6 price data using TWAP every day
////////////////////////////////////////////////////////////////////////////////////////
const addDropsPrice = cron.schedule('0 0 0 * * *', async () => {
  const allNfts = await Nft.findAll();

  for (let i = 0; i < allNfts.length; i++) {
    const nft = allNfts[i];
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

    if (nft.roundId > 30) {
      // remove old Prices history
      for (i = nft.roundId - 30; i > 0; i--) {
        await Price.destroy({
          where: {
            nftId: nft.id,
          },
        });
      }
    }
  }
});

////////////////////////////////////////////////////////////////////////////////////////
/// verify transactions every 5 minutes
////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  updateDropsPrice,
  addDropsPrice,
};
