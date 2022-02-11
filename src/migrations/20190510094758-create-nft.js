module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Nfts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      chainId: {
        type: Sequelize.STRING,
      },
      roundId: {
        type: Sequelize.INTEGER,
      },
      dropsPrice: {
        type: Sequelize.INTEGER,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Nfts'),
};
