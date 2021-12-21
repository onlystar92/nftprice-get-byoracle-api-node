module.exports = (sequelize, DataTypes) => {
  const Price = sequelize.define('Price', {
    nftID: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    usdPrice0: {
      type: DataTypes.STRING,
    },
    usdPrice1: {
      type: DataTypes.STRING,
    },
    usdPrice2: {
      type: DataTypes.STRING,
    },
    usdPrice3: {
      type: DataTypes.STRING,
    },
    usdPrice4: {
      type: DataTypes.STRING,
    },
    usdPrice5: {
      type: DataTypes.STRING,
    },
    usdPrice6: {
      type: DataTypes.STRING,
    },
    usdPrice7: {
      type: DataTypes.STRING,
    },
    etherPrice0: {
      type: DataTypes.STRING,
    },
    etherPrice1: {
      type: DataTypes.STRING,
    },
    etherPrice2: {
      type: DataTypes.STRING,
    },
    etherPrice3: {
      type: DataTypes.STRING,
    },
    etherPrice4: {
      type: DataTypes.STRING,
    },
    etherPrice5: {
      type: DataTypes.STRING,
    },
    etherPrice6: {
      type: DataTypes.STRING,
    },
    etherPrice7: {
      type: DataTypes.STRING,
    },
  });
  Price.associate = function (models) {
    models.Price.belongsTo(models.Nft, { foreignKey: 'nftID' });
    // associations can be defined here
  };
  return Price;
};
