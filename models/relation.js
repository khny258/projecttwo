module.exports = function(sequelize, DataTypes) {
  var Relation = sequelize.define("relation", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Relation;
};
