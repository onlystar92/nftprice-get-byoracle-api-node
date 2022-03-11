'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nftId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tokenId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      blockTimestamp: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      etherValue: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      transactionHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      from: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      to: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      outlier: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      sameTokenIDSold: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      blockConfirmed: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Sales'),
};
