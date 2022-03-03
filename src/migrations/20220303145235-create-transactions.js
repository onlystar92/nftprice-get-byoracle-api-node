'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
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
      tokenId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      etherValue: {
        type: Sequelize.INTEGER,
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      verificationStatus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      chainId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return (queryInterface, Sequelize) =>
      queryInterface.dropTable('Transactions');
  },
};
