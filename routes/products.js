var models  = require('../models');
var express = require('express');
var router  = express.Router();
var md5 = require('md5');



// api-URL /products/create
// POST-Request
// Returns 200 result if a product is created
router.post('/create', function(req, res) {
  return models.Product.create(req.body).then(function(response) {
    return res.json(response)
  }).catch((error) => {
    return res.json(error)
  })
});

// api-URL /products/update
// POST-Request
// Returns 200 result if a product is updated
router.put('/update', function(req, res) {
  let where = { id: req.body.id}
  models.Product.update(req.body, {where}).then(function() {
    res.json("success")
  }).catch((error) => {
    res.json(error)
  })
});


module.exports = router;
