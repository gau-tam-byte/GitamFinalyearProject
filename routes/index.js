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
 


  res.send(req.userRoot)
  // res.status(400).send({error:"PLease login"})
  
})

router.get('/AboutAgent',agentauth,(req,res)=>{
  res.send(req.AgentData)
})

router.get('/ReqofuserRequests',agentauth,(req,res)=>{
  res.send( req.uerreqs )
})

// router.post('/UpdateSerreqdata',async(req,res)=>{
//   try {
//     const S = req.body.Requests.Status
//     const objid = req.body.Requests._id
    
//     console.log(Statu)
//     if(!Status){
//       return res.status(400).json({error:"data not recieved to update form react state"})
//     }

//     const updatestatus = await user.findByIdAndUpdate({_id: objid},{$set:{'Requests.Status':S}},(err,doc)=>{
//       if(err) return console.log({error:"err"})
//       else res.send(doc)
//     })  
//     if(!updatestatus){
//       return res.status(400).json({error:"data not update in mongodb"})
//     }
//     return res.status(200).json({message:"data updated in mongodb"})
//   } catch (error) {
//     console.log(error)
//   }


// })



// router.post('/updatestatuss',async(req,res,next)=>{
//   const Status = req.body.Status
//   const ID = req.body._id

//   try {
//     await user.updateOne({_id :ID} ,{$push :{Requests: Status= "PROGRES..."}}, (err, updatedstatus)=>{
//       if(err) return  console.log("not updated")
//         updatedstatus.Status = Status="PROGRES..."
//         updatedstatus.save();
//         res.send("Updated");
    
//         res.send(updatedstatus)
//     })
//   } catch (error) {
//     console.log(console.error({error:"kadhas"}))
//   }

//   next()



// })

router.put('/updsta',async(req,res)=>{
  const id = req.body._id
  const st = req.body.Status

  try {
      await user.updateMany({"Requests._id": id},{$set:{"Requests.$.Status":st}},{new:false},(err,doc)=>{
      if(err){
        console.log(error)

      }else{
        res.send(doc)
        console.log("docment updated")
      }
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router