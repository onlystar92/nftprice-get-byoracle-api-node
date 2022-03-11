module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    nftId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    tokenId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blockTimestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    etherValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    transactionHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    outlier: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    sameTokenIDSold: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    blockConfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
  Sale.associate = function (models) {
    models.Sale.belongsTo(models.Nft, { foreignKey: 'nftId' });
  };
  return Sale;
};
