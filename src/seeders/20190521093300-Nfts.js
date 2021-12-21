module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Nfts',
      [
        {
          id: 0,
          name: 'CryptoPunk #6595',
          tokenId: '6595',
          contract: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Nfts', null, {}),
};
