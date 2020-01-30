var models  = require('../../models');
var express = require('express');
var router  = express.Router();
var functions = require('./functions')


// api-URL /categories/create
// POST-Request
// Returns success if category is created
router.post('/create', function(req, res) {
  return functions.createCategory(req).then((response) => {
    return res.json(response)
  })
});

// api-URL /categories/getCategories
// POST-Request
// Returns all categories along with associated products

router.post('/getCategories', async function(req,res) {

 return functions.getCategories(req).then((response) => {
   return res.json(response)
 })

});


module.exports = router;
