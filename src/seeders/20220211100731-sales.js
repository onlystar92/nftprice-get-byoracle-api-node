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
          updatedAt: new Date(),
          etherValue: 101,
          transactionHash: '0x01',
          outlier: false,
        },
        {
          id: 1,
          nftID: 0,
          tokenId: 6227,
          timestamp: new Date(
            +new Date() - Math.floor(Math.random() * 10000000000)
          ), // randome date
          createdAt: new Date(),
          updatedAt: new Date(),
          etherValue: 787,
          transactionHash: '0x01',
          outlier: false,
        },
        {
          id: 2,
          nftID: 0,
          tokenId: 6227,
          timestamp: new Date(
            +new Date() - Math.floor(Math.random() * 10000000000)
          ), // randome date
          createdAt: new Date(),
          updatedAt: new Date(),
          etherValue: 453,
          transactionHash: '0x01',
          outlier: false,
        },
        {
          id: 3,
          nftID: 0,
          tokenId: 6227,
          timestamp: new Date(
            +new Date() - Math.floor(Math.random() * 10000000000)
          ), // randome date
          createdAt: new Date(),
          updatedAt: new Date(),
          etherValue: 345,
          transactionHash: '0x02',
          outlier: false,
        },
        {
          id: 4,
          nftID: 0,
          tokenId: 6227,
          timestamp: new Date(
            +new Date() - Math.floor(Math.random() * 10000000000)
          ), // randome date
          createdAt: new Date(),
          updatedAt: new Date(),
          etherValue: 5,
          transactionHash: '0x03',
          outlier: false,
        },
        {
          id: 5,
          nftID: 0,
          tokenId: 6227,
          timestamp: new Date(
            +new Date() - Math.floor(Math.random() * 10000000000)
          ), // randome date
          createdAt: new Date(),
          updatedAt: new Date(),
          etherValue: 23,
          transactionHash: '0x04',
          outlier: true,
        },
        {
          id: 6,
          nftID: 0,
          tokenId: 6227,
          timestamp: new Date(
            +new Date() - Math.floor(Math.random() * 10000000000)
          ), // randome date
          createdAt: new Date(),
          updatedAt: new Date(),
          etherValue: 12,
          transactionHash: '0x05',
          outlier: true,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Prices', null, {});
  },
};
