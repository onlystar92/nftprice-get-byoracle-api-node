import { Nft } from '../models';
import { getSalesExtremeOutliersRemoved } from './outlier';
import { calcAverage } from '../helpers';

// get truncated mean(average price)
const calcTruncateMean = async (arr) => {
  const lastArr = arr.slice(-50);

  //sort array by sale size
  lastArr.sort(function (a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });

  const midArr = lastArr.slice(3, 47);
  return calcAverage(midArr).toFixed(4);
};

// get truncated mean(average price)
export const updateTruncatedMean = async (nftId) => {
  const { sales, enoughSaleData } = await getSalesExtremeOutliersRemoved(
    nftId,
    100
  );

  if (enoughSaleData) {
    const prices = sales.map((s) => s.price);
    const truncatedMean = await calcTruncateMean(prices);

    if (truncatedMean > 0) {
      const nft = await Nft.findByPk(nftId);

      if (nft) {
        await nft.update({
          ...nft,
          truncatedMean,
        });
      }
    }
  }
};
