import { getSalesExtremeOutliersRemoved } from './outlier';

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

// get sample standard deviation
const getDeviation = async (arr, minTrime, truncatedMean) => {
  const lastArr = arr.slice(-50);
  const midArr = lastArr.slice(3, 47);

  let sum = 0;
  for (let i = 0; i < midArr.length; i++) {
    sum += Math.pow(midArr[i] - truncatedMean, 2);
  }

  const deviation = Math.sqrt(sum / (midArr.length - 1));

  // when lower standard deviation bound can't be lower than 20% of the trimmed mean value.
  if (deviation > truncatedMean * minTrime) {
    return deviation;
  }
  return truncatedMean;
};

// remove probable outliers and get valid sales
const removeProbableOutliers = async (
  arr,
  minX,
  maxX,
  minTrime,
  truncatedMean
) => {
  const validSalesArr = [];
  const prices = arr.map((s) => s.price);

  const s = await getDeviation(prices, minTrime, truncatedMean);

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

// calculate the price using Drops math
// https://docs.drops.co/nft-price-oracle/overview
export const calcDropsMath = async (
  nftId,
  lowerSD = 2,
  upperSD = 6,
  floorQuntityOfSales = 10,
  minTrime = 0.2,
  truncatedMean
) => {
  //Extreme Outliers Removal
  const { sales, enoughSaleData } = await getSalesExtremeOutliersRemoved(
    nftId,
    100
  );

  if (!enoughSaleData) {
    return 0;
  }

  //Probable Outliers Removal
  const probableRemoval = await removeProbableOutliers(
    sales,
    lowerSD,
    upperSD,
    minTrime,
    truncatedMean
  );

  //Get Current Floor
  const floorPrice = await getCurrentFloor(
    probableRemoval,
    floorQuntityOfSales
  );

  return floorPrice;
};
