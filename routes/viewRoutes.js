const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('portal/homepage');
});

router.get('/signup', (req, res) => {
  res.render('portal/signup');
});

router.get('/login', (req, res) => {
  res.render('portal/login');
});

module.exports = router;
