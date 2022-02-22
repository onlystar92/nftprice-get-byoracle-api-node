const calcAverage = (arr) => {
  const sum = arr.reduce((a, b) => a + b, 0);
  return sum / arr.length || 0;
};

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = { calcAverage, randomIntFromInterval };
