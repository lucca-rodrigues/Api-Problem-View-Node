module.exports = (sequelize, DataTypes) => {
  const View = sequelize.define(
    "View",
    {
      UserId: DataTypes.STRING,
      ProblemId: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  View.associate = function (models) {
    View.belongsTo(models.Problem, { as: "problems", foreignKey: "ProblemId" });
    View.belongsTo(models.User, { as: "users", foreignKey: "UserId" });
  };

  return View;
};
