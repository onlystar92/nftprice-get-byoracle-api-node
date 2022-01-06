import { GraphQLClient, gql } from 'graphql-request';

require('dotenv').config();

const checkPrice = async (contract, oldPrice, newPrice, lastUpdatedAt) => {
  // when trying to update price at first time
  if (oldPrice === 0) {
    return true;
  }

  // when trying to update after less than 1 hour
  const now = new Date();
  if (Math.abs(now - lastUpdatedAt) / 36e5 < 1) {
    return false;
  }

  // when price not changed
  if (oldPrice === newPrice || newPrice === 0) {
    return false;
  }

  // check if multi sales happened in one day

  // chec if price deviation is too large
  if (newPrice >= oldPrice * 2) {
    return false;
  } else if (newPrice < oldPrice * 0.2) {
    return false;
  }
};

module.exports = checkPrice;
