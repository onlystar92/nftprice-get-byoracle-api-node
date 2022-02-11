module.exports = (sequelize, DataTypes) => {
  const Nft = sequelize.define('Nft', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chainId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roundId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    dropsPrice: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  });
  Nft.associate = function (models) {
    // associations can be defined here
  };
  return Nft;
};
