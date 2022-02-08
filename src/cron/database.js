import cron from 'node-cron';

import { Nft, Price, Status } from '../models';
import fetchPrice from '../engine/fetchPrice';
import checkPrice from '../engine/checkPrice';
import { writeUSDPriceIntoContract } from '../engine/writeUSDPriceIntoContract';

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
    let newUsdPriceString = nftPrice.usdPrice;
    const index = (nftPrice.priceIndex + 1) % 8;
    const usdPriceArrayString = newUsdPrice.split(',');
    const newPrice = await fetchPrice(nft.contract);

    const needUpdate = checkPrice(
      parseFloat(usdPriceArrayString[index]),
      newPrice,
      nftPrice.updatedAt
    );

    if (needUpdate) {
      usdPriceArrayString[index] = newPrice.toString();
      newUsdPriceString = usdPriceArrayString.join(',');

      await writeUSDPriceIntoContract(nft.contract, newPrice);
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

// "* * * * * *"
//  | | | | | |
//  | | | | | |
//  | | | | | day of week
//  | | | | month
//  | | | day of month
//  | | hour
//  | minute
//  second(optional)

const databaseTask = cron.schedule('* * 1 * * *', async () => {
  const allNfts = await retrievNfts();
  for (let i = 0; i < allNfts.length; i++) {
    await updateTokenPrice(allNfts[i]);
  }
});

module.exports = databaseTask;
