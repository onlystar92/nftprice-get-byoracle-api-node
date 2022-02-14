import cron from 'node-cron';

import calcDropsMath from './dropsMath';

////////////////////////////////////////////////////////////////////////////////////////
/// calculate drops oracle Price every 4 hours
////////////////////////////////////////////////////////////////////////////////////////
const updateDropsPrice = crons.schedule('0 0 */4 * * *', async () => {
  const allNfts = await Nft.findAll();

  for (let i = 0; i < allNfts.length; i++) {
    const nft = allNfts[i];
    const sales = await Sales.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        nftID: nft.id,
      },
    });
    const prices = sales.map((s) => s.etherValue).slice(-100);
    const newPrice = await calcDropsMath(prices);

    if (newPrice > 0) {
      await Price.create({
        nftID: nft.id,
        usdPrice: newPrice,
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

    const newDropsPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    await nft.update({
      ...nft,
      roundId: nft.roundId + 1,
      dropsPrice: newDropsPrice,
    });
  }
});

module.exports = {
  updateDropsPrice,
  addDropsPrice,
};
