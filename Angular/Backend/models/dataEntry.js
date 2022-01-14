'use strict';

module.exports = (sequelize, DataType) => {
  let DataEntry = sequelize.define('DataEntry', {
    // id missing because Sequelize adds it by default
    name:  DataType.STRING(100),
    cast: DataType.STRING(100),
    director: DataType.STRING(100),
    rated: DataType.BOOLEAN(1),
    reviews: DataType.STRING(10000),
    evaluation: DataType.INTEGER(100),
    user_id: DataType.INTEGER(100),
    movie_id: DataType.INTEGER(100),
    seen: DataType.BOOLEAN(1),
    must_see: DataType.BOOLEAN(1)
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'data'
  });

  // Association to other models (foreign keys)
  DataEntry.associate = function (models) {

  };

  return DataEntry;
};

