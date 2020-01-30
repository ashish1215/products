var models  = require('../models');
var express = require('express');
var router  = express.Router();
var md5 = require('md5');

router.post('/create', function(req, res) {
  return models.Product.create(req.body).then(function(response) {
    return res.json(response)
  }).catch((error) => {
    return res.json(error)
  })
});


router.put('/update', function(req, res) {
  let where = { id: req.body.id}
  models.Product.update(req.body, {where}).then(function() {
    res.json("success")
  }).catch((error) => {
    res.json(error)
  })
});


module.exports = router;
