var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
  return models.Category.create(req.body).then(function(response) {
    return res.json(response)
  }).catch((error) => {
    return res.json(error)
  })
});

router.post('/getCategories', async function(req,res) {
  let result = await models.Category.findAll({include:[{ model: models.Product}] });
  return res.json(result);

});


module.exports = router;
