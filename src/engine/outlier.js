import { Sale } from '../models';

// get valid sales without exterme outliers
export const getSalesExtremeOutliersRemoved = async (nftId, count) => {
  const sales = await Sale.findAll({
    order: [['blockTimestamp', 'DESC']],
    offset: 0,
    limit: count,
    where: {
      extreamOutlier: false,
      nftId,
      blockConfirmed: true,
      sameTokenIDSold: false,
    },
  }).map((sale) => {
    const newSaleData = {
      price: sale.etherValue,
      id: sale.tokenId,
    };
    return newSaleData;
  });
  return {
    sales,
    enoughSaleData: sales.length >= count,
  };
};
