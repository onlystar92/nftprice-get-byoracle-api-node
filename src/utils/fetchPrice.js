import { GraphQLClient, gql } from 'graphql-request';

require('dotenv').config();

const fetchPrice = async () => {
  const endpoint = 'https://developers.icy.tools/graphql';

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      'x-api-key': process.env.ICY_API_KEY,
    },
  });

  const query = gql`
    query Contract {
      contract(address: "0x75e95ba5997eb235f40ecf8347cdb11f18ff640b") {
        address
        __typename
        tokenStandard
        ... on ERC721Contract {
          name
          isVerified
          stats(timeRange: { gte: "2021-01-01T00:00:00+0000" }) {
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
