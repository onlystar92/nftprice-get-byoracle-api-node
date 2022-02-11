import { GraphQLClient, gql } from 'graphql-request';

require('dotenv').config();

////////////////////////////////////////////
/// for icy.tools service
////////////////////////////////////////////

const fetchPrice = async (contract, searchDate) => {
  const endpoint = 'https://graphql.icy.tools/graphql';

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      'x-api-key': process.env.ICY_API_KEY,
    },
  });

  const query = gql`
    query Contract {
      contract(address: "${contract}") {
        address
        __typename
        tokenStandard
        ... on ERC721Contract {
          name
          isVerified
          stats(timeRange: { gte: "${searchDate}" }) {
            totalSales
            floor
            average
            volume
          }
        }
      }
    }
  `;

  let floorPrice = 0;
  try {
    const res = await graphQLClient.request(query);
    if (res && res.contract && res.contract.stats) {
      floorPrice = res.contract.stats.floor;
    }
  } catch (e) {
    floorPrice = 0;
  }

  return floorPrice;
};

module.exports = fetchPrice;
