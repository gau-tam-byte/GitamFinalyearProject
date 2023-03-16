const express = require('express')
const router = express.Router()
const auth = require('../middleware/authenticate');
const User = require('../models/user');




router.get('/',(req,res)=>{
  req.flash("sucess")
  res.render('Aboutus')
})
router.get('/index', (req, res) => {
    req.flash('Success');
    res.render('index')
})








module.exports = router