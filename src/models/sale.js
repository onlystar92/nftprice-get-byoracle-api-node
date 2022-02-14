module.exports = (sequelize, DataTypes) => {
  const Price = sequelize.define('Sale', {
    nftID: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    tokenId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    etherValue: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    transactionHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Price.associate = function (models) {
    models.Price.belongsTo(models.Nft, { foreignKey: 'nftID' });
  };
  return Price;
};
