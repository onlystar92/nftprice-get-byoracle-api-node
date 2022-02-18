'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Prices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nftID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      etherValue: {
        type: Sequelize.INTEGER,
      },
      roundId: {
        type: Sequelize.INTEGER,
      },
      source: {
        type: Sequelize.ENUM,
        values: ['icy.tools', 'nftx', 'drops'],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Prices'),
};
