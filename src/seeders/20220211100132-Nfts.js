'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Nfts',
      [
        {
          id: 0,
          name: 'CryptoPunk #6227',
          address: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
          chainId: '0',
          roundId: 0,
          dropsPrice: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Nfts', null, {});
  },
};
