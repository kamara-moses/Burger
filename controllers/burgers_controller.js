const express = require('express');

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require('../models/burger.js');

// Create all our routes and set up logic within those routes where required.
router.get('/', (req, res) => {
  burger.selectAll((data) => {
    const hbsObject = {
      burger: data
    };
    console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

router.post('/api/burgers', (req, res) => {
  burger.insertOne(['burger_name', 'devoured'], [req.body.burger_name, req.body.devoured], (result) => {

    res.redirect('/');
  });
});

router.put('/api/burgers/:id', (req, res) => {
  const condition = 'id = ' + req.params.id;

  console.log('condition', condition);

   burger.updateOne({
      devoured: req.body.devoured
    },
    condition,
    (result) => {
      res.redirect('/');
    }
  );
});

// Export routes for server.js to use.
module.exports = router;