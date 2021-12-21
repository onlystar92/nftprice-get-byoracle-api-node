module.exports = (sequelize, DataTypes) => {
  const Nft = sequelize.define('Nft', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contract: {
      type: DataTypes.STRING,
    },
    tokenId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Nft.associate = function (models) {
    // associations can be defined here
  };
  return Nft;
};
