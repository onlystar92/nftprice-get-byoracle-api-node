import { Sale, Nft, Price } from '../../models';
import { successResponse, errorResponse } from '../../helpers';
import { checkSaleIfOutlier, calcDropsMath } from '../../engine/drops';
import { randomIntFromInterval } from '../../engine/utils';

export const addSale = async (req, res) => {
  try {
    for (let i = 100; i < 250; i++) {
      const address = '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb';
      const chainId = '0';
      const tokenId = i + 1000;
      const timestamp = new Date(
        +new Date() - Math.floor(Math.random() * 10000000000)
      );
      const etherValue = randomIntFromInterval(1, 1000);
      const transactionHash = `0xtesttransaction${i}`;
      const currentPrice = parseFloat(etherValue);

      let nft = await Nft.findOne({
        where: { address, chainId },
      });

      if (nft === null) {
        nft = await Nft.create({
          name: '',
          chainId,
          address,
        });
      }

      const outlier = await checkSaleIfOutlier(nft.id, currentPrice);

      const payload = {
        id: i,
        nftID: nft.id,
        tokenId,
        timestamp: new Date(timestamp * 1000),
        etherValue: currentPrice,
        transactionHash,
        createdAt: new Date(),
        outlier,
      };
      await Sale.create(payload);
    }

    return successResponse(req, res, {});
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, error.message);
  }
};

export const dropMath = async (req, res) => {
  try {
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

    return successResponse(req, res, {});
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, error.message);
  }
};
