module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "NotificationView",
    {
      lastNotificationId: DataTypes.INTEGER,
      lastNotificationTime: DataTypes.DATE,
      success: DataTypes.BOOLEAN,
      log: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return User;
};
