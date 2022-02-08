//remove extreme outliers and get valid sales
const removeExtremeOutliers = async (arr) => {
  let sum = 0;

  const outliersArr = [];

  for (let i = 0; i < 100; i++) sum += arr[i];

  let avg = sum / 100;

  for (let i = 100; i < arr.length; i++) {
    if (arr[i] >= 0.05 * avg && arr[i] <= 2.25 * avg) {
      avg = avg + arr[i] / 100 - arr[i - 100 - outliersArr.length] / 100;
    } else {
      outliersArr.push(i);
    }
  }

  for (let i = outliersArr.length - 1; i >= 0; i--)
    arr.splice(outliersArr[i], 1);

  return arr;
};

//get sample standard deviation
const getDeviation = async (arr) => {
  const lastArr = arr.slice(-50);

  const midArr = lastArr.slice(3, 47);

  let sum = 0;

  const truncatedMean = await getTruncateMean(arr);

  for (let i = 0; i < midArr.length; i++)
    sum += Math.pow(midArr[i] - truncatedMean, 2);

  return Math.sqrt(sum / (midArr.length - 1));
};

//get truncated mean(average price)
const getTruncateMean = async (arr) => {
  const lastArr = arr.slice(-50);

  //sort array by sale size

  lastArr.sort(function (a, b) {
    if (a > b) return 1;

    if (a < b) return -1;

    return 0;
  });

  const midArr = lastArr.slice(3, 47);

  let sum = 0;

  for (let i = 0; i < midArr.length; i++) sum += midArr[i];

  return sum / midArr.length;
};

//remove probable outliers and get valid sales
const removeProbableOutliers = async () => {
  const validSalesArr = [];

  const truncatedMean = await getTruncateMean(arr);

  const s = await getDeviation(arr);

  for (let i = 0; i < arr.length; i++) {
    if (
      arr[i] >= truncatedMean - minX * s &&
      arr[i] <= truncatedMean + maxX * s
    )
      validSalesArr.push(arr[i]);
  }

  return validSalesArr;
};

const getCurrentFloor = async () => {
  const lastArr = arr.slice(-15);

  return Math.min(...lastArr);
};

const calcDropsMath = async (prices) => {
  //Extreme Outliers Removal
  const extremeRemoval = await removeExtremeOutliers(prices);

  //Probable Outliers Removal
  const probableRemoval = await removeProbableOutliers(extremeRemoval, 2.5, 6);

  //Get Current Floor
  const floorPrice = await getCurrentFloor(probableRemoval);

  return floorPrice;
};

module.exports = calcDropsMath;
