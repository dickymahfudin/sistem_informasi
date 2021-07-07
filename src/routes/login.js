const express = require('express');
const router = express.Router();
const { user } = require('../models');

router.get('/', async (req, res, next) => {
  res.render('login', { title: 'Login' });
});

router.post('/', async (req, res, next) => {
  const { username, password } = req.body;
  const findUser = await user.findOne({ where: { username } });
  if (!findUser) {
    req.flash('error', 'Username dan Password Salah');
    return res.redirect('/login');
  }
  console.log(findUser.password == password);
  if (findUser.password != password) {
    req.flash('error', 'Username dan Password Salah');
    return res.redirect('/login');
  }
  req.session.login = true;
  req.flash('suuccess', 'Admin Login');
  return res.redirect('/dashboard');
});

router.get('/logout', (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
  });
  res.locals.login = false;
  res.redirect('/dashboard');
});
module.exports = router;
