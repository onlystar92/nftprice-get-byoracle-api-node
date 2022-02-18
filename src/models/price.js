module.exports = (sequelize, DataTypes) => {
  const Price = sequelize.define('Price', {
    nftID: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    etherValue: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    roundId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    source: {
      type: DataTypes.ENUM,
      values: ['icy.tools', 'nftx', 'drops'],
    },
  });
  Price.associate = function (models) {
    models.Price.belongsTo(models.Nft, { foreignKey: 'nftID' });
  };
  return Price;
};
