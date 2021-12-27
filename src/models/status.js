module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    msg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Status.associate = function (models) {
    // associations can be defined here
  };
  return Status;
};
