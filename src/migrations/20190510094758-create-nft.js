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
        allowNull: false,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      chainId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      roundId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      dropsPrice: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      seed: {
        type: Sequelize.BOOLEAN,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Nfts'),
};
