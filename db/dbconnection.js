const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})

// console.log(process.env)


// const db = 'mongodb://127.0.0.1:27017/?directConnection=true';
const db = process.env.DATABASE
// const db = 'mongodb+srv://goutamkrk:ank0NyAORK4iD4nX@cluster.dkz4ywb.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(db).then(()=>{
  console.log("connection success")
}).catch((err) =>{
  console.log(console.error(err),"connection not sucess")
})



// const tt = function (){

//   const connect = mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true')

// if(!connect){
//   console.log("Connection failed")
// }else{
//   console.log("connection sucessful")
// }
// }

// module.exports = tt;
