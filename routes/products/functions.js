var models  = require('../../models');
var express = require('express');
var router  = express.Router();


class Product {

  static createProduct(req) {
    return models.Product.create(req.body).then((response) => {
        return response
    }).catch((error) => {
        return error
    })
  }


  static updateProduct(req) {
    let where = req.body.id
    return models.Product.update(req.body, {where}).then(function(response) {
        return response
      }).catch((error) => {
        return error
      })
  }


}

module.exports = Product;