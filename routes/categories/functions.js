var models  = require('../../models');
var express = require('express');
var router  = express.Router();



class Category {

  static createCategory(req) {
    return models.Category.create(req.body).then((response) => {
        return response
    }).catch((error) => {
        return error
    })
  }

  static async getCategories(req) {
    let result = await models.Category.findAll({include:[{ model: models.Product}] });
    return result
  }


}

module.exports = Category;