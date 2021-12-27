/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import cron from 'node-cron';

import { Nft, Price, Status } from '../models';

const retrieveNFTFloorPrice = async (contract) => {
  // TODO: implement grpahlql API to retrive tokenPrice of contract
  console.log('====>contract', contract);
  return 1;
};

const updateTokenPrice = async (nft) => {
  const nftPrice = await Price.findOne({
    where: { nftID: nft.id },
  });

  if (!nftPrice) {
    await Price.create({
      nft: nft.id,
      usdPrice: '0,0,0,0,0,0,0,0',
      priceIndex: 0,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
  }

  try {
    let newUsdPrice = nftPrice.usdPrice;
    const newPriceIndex = (nftPrice.priceIndex + 1) % 8;
    const usdPriceArray = newUsdPrice.split(',');

    const newPrice = await retrieveNFTFloorPrice(nft.contract);

    if (usdPriceArray[newPriceIndex] !== newPrice.toString()) {
      usdPriceArray[newPriceIndex] = newPrice.toString();
      newUsdPrice = usdPriceArray.join(',');
    }

    await nftPrice.update({
      usdPrice: newUsdPrice,
      priceIndex: newPriceIndex,
      updatedAt: new Date(),
    });
  } catch (e) {
    await Status.create({
      msg: `failed to update price of ${nft.id}`,
      createdAt: new Date(),
    });
  }
};

const retrievNfts = async () => {
  let allNfts = [];

  try {
    const page = 1;
    const limit = 100;
    const fetchingNfts = await Nft.findAndCountAll({
      order: [['updatedAt', 'DESC']],
      offset: (page - 1) * limit,
      limit,
    });
    if (fetchingNfts && fetchingNfts.count > 0) {
      allNfts = fetchingNfts.rows;
    }
  } catch (e) {
    await Status.create({
      msg: 'failed to retrive all NFTs from database',
      createdAt: new Date(),
    });
  }

  return allNfts;
};

const databaseTask = cron.schedule('*/10 * * * * *', async () => {
  const allNfts = await retrievNfts();
  for (let i = 0; i < allNfts.length; i++) {
    await updateTokenPrice(allNfts[i]);
  }
});

module.exports = databaseTask;
