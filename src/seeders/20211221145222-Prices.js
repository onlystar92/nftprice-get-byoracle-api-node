module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Prices',
      [
        {
          id: 0,
          nftID: 0,
          usdPrice0: '391000000000',
          usdPrice1: '391000000000',
          usdPrice2: '391000000000',
          usdPrice3: '391000000000',
          usdPrice4: '391000000000',
          usdPrice5: '391000000000',
          usdPrice6: '391000000000',
          usdPrice7: '391000000000',
          etherPrice0: '391000000000',
          etherPrice1: '391000000000',
          etherPrice2: '391000000000',
          etherPrice3: '391000000000',
          etherPrice4: '391000000000',
          etherPrice5: '391000000000',
          etherPrice6: '391000000000',
          etherPrice7: '391000000000',
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Prices', null, {}),
};
