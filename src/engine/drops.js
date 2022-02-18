import { Sale, Nft } from '../models';
import { calcAverage } from './utils';

// check if current price is outlier or not
const checkSaleIfOutlier = async (nftID, price) => {
  const sales = await Sale.findAll({
    order: [['createdAt', 'DESC']],
    offset: 0,
    limit: 100,
    where: {
      outlier: false,
      nftID,
    },
  });
  const prevPrices = sales
    .map((sale) => parseFloat(sale.etherValue))
    .filter((price) => price !== 0);

  if (prevPrices.length === 0) {
    return false;
  }
  const averagePrice = calcAverage(prevPrices);
  return price < averagePrice * 0.05 || price > averagePrice * 9.5;
};

// get valid sales without exterme outliers
const getSalesExtremeOutliersRemoved = async (nftID, count) => {
  const sales = await Sale.findAll({
    order: [['createdAt', 'DESC']],
    offset: 0,
    limit: count,
    where: {
      outlier: false,
      nftID,
    },
  }).map((sale) => {
    const newSaleData = {
      price: parseFloat(sale.etherValue),
      id: sale.tokenId,
    };
    return newSaleData;
  });

  return sales;
};

// get truncated mean(average price)
const getTruncateMean = async (arr) => {
  const lastArr = arr.slice(-50);

  //sort array by sale size
  lastArr.sort(function (a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });

  const midArr = lastArr.slice(3, 47);
  return calcAverage(midArr);
};

// get sample standard deviation
const getDeviation = async (arr) => {
  const lastArr = arr.slice(-50);
  const midArr = lastArr.slice(3, 47);

  let sum = 0;
  const truncatedMean = await getTruncateMean(arr);

  for (let i = 0; i < midArr.length; i++)
    sum += Math.pow(midArr[i] - truncatedMean, 2);

  return Math.sqrt(sum / (midArr.length - 1));
};

// remove probable outliers and get valid sales
const removeProbableOutliers = async (arr, minX, maxX) => {
  const validSalesArr = [];

  const truncatedMean = await getTruncateMean(arr.map((s) => s.price));
  const s = await getDeviation(arr.map((s) => s.price));

  for (let i = 0; i < arr.length; i++) {
    if (
      arr[i].price >= truncatedMean - minX * s &&
      arr[i].price <= truncatedMean + maxX * s
    ) {
      validSalesArr.push(arr[i]);
    }
  }

  return validSalesArr;
};

// get floorPrice (minimum price) of the last nth sales
const getCurrentFloor = async (arr, floorQuntityOfSales) => {
  const prices = [];
  const addedIds = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    if (addedIds.length >= floorQuntityOfSales) {
      break;
    }
    if (!addedIds.includes(arr[i].id)) {
      prices.push(arr[i].price);
      addedIds.push(arr[i].id);
    }
  }

  return Math.min(...prices);
};

// calculate the price using Drops math
// https://docs.drops.co/nft-price-oracle/overview
const calcDropsMath = async (
  nftID,
  count = 100,
  lowerSD = 2,
  upperSD = 6,
  floorQuntityOfSales = 10
) => {
  //Extreme Outliers Removal
  const extremeRemovalSales = await getSalesExtremeOutliersRemoved(
    nftID,
    count
  );

  //Probable Outliers Removal
  const probableRemoval = await removeProbableOutliers(
    extremeRemovalSales,
    lowerSD,
    upperSD
  );

  //Get Current Floor
  const floorPrice = await getCurrentFloor(
    probableRemoval,
    floorQuntityOfSales
  );

  return floorPrice;
};

module.exports = { checkSaleIfOutlier, calcDropsMath };
