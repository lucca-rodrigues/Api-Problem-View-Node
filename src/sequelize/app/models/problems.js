module.exports = (sequelize, DataTypes) => {
  const Problem = sequelize.define(
    "Problem",
    {
      ownerId: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return Problem;
};
