'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Nfts',
      [
        {
          id: 0,
          name: 'BoredApeYachtClub',
          address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
          chainId: '1',
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
