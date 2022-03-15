'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Nfts', 'truncatedMean', {
      type: Sequelize.FLOAT,
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Nfts', 'truncatedMean');
  },
};
