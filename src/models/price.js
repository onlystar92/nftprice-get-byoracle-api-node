module.exports = (sequelize, DataTypes) => {
  const Price = sequelize.define('Price', {
    nftID: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    usdPrice: {
      type: DataTypes.STRING,
    },
    priceIndex: {
      type: DataTypes.NUMBER,
    },
  });
  Price.associate = function (models) {
    models.Price.belongsTo(models.Nft, { foreignKey: 'nftID' });
  };
  return Price;
};
