module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Prices',
      [
        {
          id: 0,
          nftID: 0,
          usdPrice: '0,0,0,0,0,0,0,0',
          priceIndex: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Prices', null, {}),
};
