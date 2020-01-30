var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.Category.findAll({
    include: [ models.Product ]
  }).then(function(categories) {
    res.render('index', {
      title: 'Sequelize: Express Example',
      categories: categories
    });
  });
});

module.exports = router;
