const express = require('express');
const router = express.Router()
// const cookieparser = require('cookie-parser');
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const auth = require('../middleware/authenticate');


  router.post('/register',async (req, res, next) => { 

    try {
      const { name, username, email,Phone, password, confirmationPassword} = req.body

      if ( !name || !username || !email ||!Phone|| !password || !confirmationPassword) {
      
        return res.status(422).json({error : "Please fill all the data"})
      }
      const user = await User.findOne({ email: email })
      if (user) {
 
        return res.status(421).json({error : "Email is already in use."})
      }
   
      const newUser = await new User(req.body)
      const userregistered = await newUser.save()
      if(userregistered){
        return res.status(201).json({message : "User Successfully registered"})
      }
      
    } catch(error) {
   
      console.log(error)
    }
  });



  router.post('/login',async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password ) {
      return res.status(400).json({error:"Please fill the credentials"})
      
    }
    const user = await User.findOne({ email: email })
    console.log(req.body.password)
    if (user) {
      let passwordIsValid = await bcrypt.compareSync( password , user.password);
      let token = await user.generateAuthToken();
      console.log(token)
      res.cookie('jwtoken',token,{
        expires: new Date(Date.now() + 1000001),
        httpOnly:true
      })
      if (!passwordIsValid) {
        return res.status(400).json({error:"Invalid Credentials"})
    
       
      }else{
        res.json({message:"user Login Sucessfull"})
      }
   
    }
  } catch (error) {
    next(error)
  }

})

router.get('/getdata',auth,(req,res)=>{
  console.log("hello from Request service page")
  res.send(req.rootuser)
})

router.post('/Reqser',auth, async (req,res)=>{
  try {
    const { name, email, Phone, Reqtype, Date ,Description} = req.body
    
    if ( !name|| !email|| !Phone ||!Reqtype || !Date  || !Description) {
      
      return res.status(422).json({error :" PLease Enter all data"})
    }
  
   
    const usercontact = await User.findOne({_id : req.userID})
    if(usercontact){
      await usercontact.addrequest(name,email,Phone,Reqtype,Date,Description);
      await usercontact.save()
      return res.status(201).json({message : "Request sent successfully"})
    }    
  } catch(error) {
    console.log(error)
  }

})

router.get('/AboutUs',auth,(req,res)=>{
  console.log("hello from about us page")
  res.send(req.rootuser)
})


router.get('/logout',(req,res)=>{
  res.clearCookie('jwtoken',{path: '/'})
  res.status(200).send("User Logged out")
})
  module.exports = router