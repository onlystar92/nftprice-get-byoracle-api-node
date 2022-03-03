module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
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
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verificationStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chainId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Transaction.associate = function (models) {
    models.Transaction.belongsTo(models.Nft, { foreignKey: 'nftID' });
  };
  return Transaction;
};
