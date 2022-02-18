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
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Prices', null, {});
  },
};
