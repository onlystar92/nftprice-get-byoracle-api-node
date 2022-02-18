import cron from 'node-cron';

import { calcDropsMath } from './drops';
import { calcAverage } from './utils';

////////////////////////////////////////////////////////////////////////////////////////
/// calculate drops oracle Price every 4 hours
////////////////////////////////////////////////////////////////////////////////////////
const updateDropsPrice = crons.schedule('0 0 */4 * * *', async () => {
  const allNfts = await Nft.findAll();

  for (let i = 0; i < allNfts.length; i++) {
    const nft = allNfts[i];
    const newPrice = await calcDropsMath(nft.id);

    if (newPrice > 0) {
      await Price.create({
        nftID: nft.id,
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
        nftID: nft.id,
      },
    }).map((p) => p.etherValue);

    await nft.update({
      ...nft,
      roundId: nft.roundId + 1,
      dropsPrice: calcAverage(prices),
    });
  }
});

module.exports = {
  updateDropsPrice,
  addDropsPrice,
};
