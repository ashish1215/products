var models  = require('../models');
var express = require('express');
var router  = express.Router();


// api-URL /categories/create
// POST-Request
// Returns success if category is created
router.post('/create', function(req, res) {
  return models.Category.create(req.body).then(function(response) {
    return res.json(response)
  }).catch((error) => {
    return res.json(error)
  })
});

// api-URL /categories/getCategories
// POST-Request
// Returns all categories along with associated products

router.post('/getCategories', async function(req,res) {
  let result = await models.Category.findAll({include:[{ model: models.Product}] });
  return res.json(result);

});


module.exports = router;
