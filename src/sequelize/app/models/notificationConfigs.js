module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "NotificationConfig",
    {
      notificationTime: DataTypes.INTEGER,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return User;
};
