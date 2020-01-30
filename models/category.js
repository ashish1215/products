'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    name:{
      type: DataTypes.STRING
    }, 
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    }
  });


  // association between category and product is defined (hasMany)
  Category.associate = function(models) {
    models.Category.hasMany(models.Product);
  };
  return Category;
};
