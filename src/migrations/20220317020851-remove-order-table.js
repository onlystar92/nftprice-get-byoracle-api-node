'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.dropTable('Orders'),

  down: (queryInterface, Sequelize) =>
    queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      transactionHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nftId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      etherValue: {
        type: Sequelize.FLOAT,
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
};
