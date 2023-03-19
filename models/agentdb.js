const mongoose = require('mongoose')
const agentSchema = mongoose.Schema
const bcrypt = require('bcryptjs')
const agentdb = new agentSchema({
  name: String,
  Phone: Number,
  NationalID: Number,
  Profession: String,
  Password: String,
  cPassword: String,
},{
  // 3 
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})
agentdb.pre('save', async function (next){
  if(this.isModified('Password')){
    this.Password = await bcrypt.hash(this.Password,12)
    this.cPassword = await bcrypt.hash(this.cPassword,12)
  }
})

const agent = mongoose.model('agent',agentdb)

module.exports = agent