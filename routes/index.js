const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const agent = require('../models/agentdb')
const user = require('../models/user')
const agentauth = require('../middleware/authagent')
// const { token } = require('morgan');
// const { db } = require('../models/user')



router.post('/agentregister',async (req,res,next)=>{
  try {
    const{ name , Phone, NationalID, Profession, Password, cPassword} = req.body;
    if(!name || !Phone ||!NationalID||!Profession||!Password||!cPassword){
      return res.status(401).send("Fill all the Required Data")
    }

    const newagent = await new agent(req.body)
    const agentregister = await newagent.save()
    if(agentregister){
      return res.status(201).json({message:"Agent Successfully Register!"})
    }
  } catch (error) {
    return res.status(400).json({error:"Agent Not registered!?"})
  }
 
})


router.post('/agentlogin',async(req,res,next)=>{
   try {
    const { name, Password } = req.body
    if (!name || !Password ) {
      return res.status(400).json({error:"Please Fill the credentials"})
      
    }
    const Agent = await agent.findOne({ name:name })
    console.log(req.body.Password)
    if (Agent) {
      let passwordIsValid = await bcrypt.compareSync( Password, Agent.Password);
      const token = await Agent.genagentauthtoken()
      console.log(token)
      res.cookie('agentjwtoken',token,{
        expires: new Date(Date.now() + 1000000),
        httpOnly:true
      })
      if (!passwordIsValid) {
        return res.status(400).json({error:"Invalid Credentials"})
       
      }else{
       return  res.status(200).json({message:"Agent Login Successfull"})
      }
   
    }
   } catch (error) {
    next(error)
    // console.log(error)
   }
})


router.get('/Serreqs',agentauth,(req,res)=>{
 
  // let userreqdata = user.findOne({})

  res.send(req.userRoot)
  res.status(400).send({error:"PLease login"})
  // res.send("login first")
  // res.send(req.userProtype)
  // console.log(userreqdata)

  // console.log("Hello from Service Request page")
})

router.get('/AboutAgent',agentauth,(req,res)=>{
  res.send(req.AgentData)
})

router.get('/ReqofuserRequests',agentauth,(req,res)=>{
  res.send(req.uerreqs)
})




module.exports = router