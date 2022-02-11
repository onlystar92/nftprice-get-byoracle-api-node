'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Sales',
      [
        {
          id: 0,
          nftID: 0,
          tokenId: 6227,
          timestamp: new Date(
            +new Date() - Math.floor(Math.random() * 10000000000)
          ), // randome date
          createdAt: new Date(),
          usdValue: 101,
          transactionHash: '0x01',
        },
        {
          id: 1,
          nftID: 0,
          tokenId: 6227,
          timestamp: new Date(
            +new Date() - Math.floor(Math.random() * 10000000000)
          ), // randome date
          createdAt: new Date(),

          usdValue: 787,
          transactionHash: '0x01',
        },
        {
          id: 2,
          nftID: 0,
          tokenId: 6227,
          timestamp: new Date(
            +new Date() - Math.floor(Math.random() * 10000000000)
          ), // randome date
          createdAt: new Date(),

          usdValue: 453,
          transactionHash: '0x01',
        },
        {
          id: 3,
          nftID: 0,
          tokenId: 6227,
          timestamp: new Date(
            +new Date() - Math.floor(Math.random() * 10000000000)
          ), // randome date
          createdAt: new Date(),

          usdValue: 345,
          transactionHash: '0x02',
        },
        {
          id: 4,
          nftID: 0,
          tokenId: 6227,
          timestamp: new Date(
            +new Date() - Math.floor(Math.random() * 10000000000)
          ), // randome date
          createdAt: new Date(),

          usdValue: 5,
          transactionHash: '0x03',
        },
        {
          id: 5,
          nftID: 0,
          tokenId: 6227,
          timestamp: new Date(
            +new Date() - Math.floor(Math.random() * 10000000000)
          ), // randome date
          createdAt: new Date(),

          usdValue: 23,
          transactionHash: '0x04',
        },
        {
          id: 6,
          nftID: 0,
          tokenId: 6227,
          timestamp: new Date(
            +new Date() - Math.floor(Math.random() * 10000000000)
          ), // randome date
          createdAt: new Date(),

          usdValue: 12,
          transactionHash: '0x05',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Prices', null, {});
  },
};
