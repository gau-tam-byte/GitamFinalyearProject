const jwt = require('jsonwebtoken')

const User = require('../models/user')

const Authenticatess = (async (req,res,next) =>{

  try {
    const token = await req.cookies.jwtoken;
  
    const verifytoken = jwt.verify(token,'dajdfjasdfjasdlkfhashdfhjads')
    const rootuser = await User.findOne({_id: verifytoken._id,"tokens.token":token})
    

    if(!rootuser){
      throw new Error('user not found')
      
    }
    req.token = token;
    // console.log(token)
    req.rootuser = rootuser;
    req.userID = rootuser._id;
    req.userRequests = rootuser.Requests;

    next()
    return token
   
  } catch (error) {
    res.status(400).send('Unauthorized User: Please First Login')
    console.log(error)
  }
})

// const ifnotauth = (async (req,res,next)=>{
//   const token = await req.cookies.cookiesecret
//   if(!token){
//     res.redirect('/login')
//   }
//   next()
//   // return token;
// })
module.exports = Authenticatess
// module.exports = ifnotauth