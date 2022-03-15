import { Sale } from '../models';
import { calcAverage } from '../helpers';
import { updateTruncatedMean } from './truncate';

// check if current price is outlier or not
const checkSaleIfExtreamOutlier = async (nftId, price) => {
  const sales = await Sale.findAll({
    order: [['createdAt', 'DESC']],
    offset: 0,
    limit: 100,
    where: {
      extreamOutlier: false,
      nftId,
      blockConfirmed: true,
      sameTokenIDSold: false,
    },
  });

  const prevPrices = sales
    .map((sale) => sale.etherValue)
    .filter((price) => price !== 0);

  if (prevPrices.length === 0) {
    return false;
  }
  const averagePrice = calcAverage(prevPrices);
  return price < averagePrice * 0.05 || price > averagePrice * 9.5;
};

// check if same token is sold within last 24 hours
export const checkIfSameTokenIdIsSoldWithADay = async (
  nftId,
  tokenId,
  blockTime
) => {
  const ONE_HOUR = 60 * 60 * 1000; /* ms */
  const dateOneHourAgo = new Date(blockTime.getTime() - ONE_HOUR);

  const sameTokneIDSales = await Sale.findOne({
    where: {
      nftId,
      tokenId,
      blockTimestamp: {
        $between: [dateOneHourAgo, blockTime],
      },
    },
    order: [['blockTimestamp', 'DESC']],
  });

  return sameTokneIDSales !== null;
};

export const addSaleWithVerification = async (
  nftId,
  tokenId,
  blockTimestamp,
  etherValue,
  transactionHash,
  from,
  to,
  blockConfirmed,
  sameTokenIDSold
) => {
  // calculate truncatedMean
  await updateTruncatedMean(nftId);

  const extreamOutlier = await checkSaleIfExtreamOutlier(nftId, etherValue);

  const payload = {
    nftId,
    tokenId,
    blockTimestamp,
    etherValue,
    transactionHash,
    from,
    to,
    extreamOutlier,
    sameTokenIDSold,
    blockConfirmed,
  };

  const sale = await Sale.create(payload);
  console.log('===>sale.id', sale.id);
  return sale.id;
};
