module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userName: DataTypes.STRING,
      avatarUrl: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return User;
};
