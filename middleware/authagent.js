const agentjwtoken = require('jsonwebtoken')
const user = require('../models/user')

const agentauth = (async (req,res,next)=>{
  try {
    const token = await req.cookies.agentjwtoken
    const verifytk = await agentjwtoken.verify(token, 'jdslkfahsdkfhakhsf32423kjahefkjhasdjlkfhajsdb')
    const userroot = await user.find({Requests: this.name})
    console.log(userroot)

    if(!verifytk){
      throw new console.error("User Not Found!");
    }
    req.userroot = userroot
    next()
  } catch (error) {
    res.status(400).send('Unauthorized User: Please First Login')
    console.log(error)
  }
})

module.exports = agentauth