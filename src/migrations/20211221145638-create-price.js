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
        type: Sequelize.STRING,
      },
      usdPrice0: {
        type: Sequelize.STRING,
      },
      usdPrice1: {
        type: Sequelize.STRING,
      },
      usdPrice2: {
        type: Sequelize.STRING,
      },
      usdPrice3: {
        type: Sequelize.STRING,
      },
      usdPrice4: {
        type: Sequelize.STRING,
      },
      usdPrice5: {
        type: Sequelize.STRING,
      },
      usdPrice6: {
        type: Sequelize.STRING,
      },
      usdPrice7: {
        type: Sequelize.STRING,
      },
      etherPrice0: {
        type: Sequelize.STRING,
      },
      etherPrice1: {
        type: Sequelize.STRING,
      },
      etherPrice2: {
        type: Sequelize.STRING,
      },
      etherPrice3: {
        type: Sequelize.STRING,
      },
      etherPrice4: {
        type: Sequelize.STRING,
      },
      etherPrice5: {
        type: Sequelize.STRING,
      },
      etherPrice6: {
        type: Sequelize.STRING,
      },
      etherPrice7: {
        type: Sequelize.STRING,
      },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Prices'),
};
