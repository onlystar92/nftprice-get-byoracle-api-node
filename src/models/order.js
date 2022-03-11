module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    transactionHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nftId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    etherValue: {
      type: DataTypes.FLOAT,
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
  });

  return Order;
};
