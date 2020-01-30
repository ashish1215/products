var models  = require('../../models');
var express = require('express');
var router  = express.Router();
var functions = require('./functions')


// api-URL /products/create
// POST-Request
// Returns 200 result if a product is created
router.post('/create', function(req, res) {
  return functions.createProduct(req).then((response) => {
    return res.json(response)
  })
});

// api-URL /products/update
// POST-Request
// Returns 200 result if a product is updated
router.put('/update', function(req, res) {
  return functions.updateProduct(req).then((response) => {
    return res.json(response)
  })
  
});


module.exports = router;
