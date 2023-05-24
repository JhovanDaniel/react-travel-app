const mongoose = require("mongoose")

const UserSchema = new mongoose.mongoose.Schema({
  username: {
    type:String,
    require:true,
    min:3,
    max:30,
    unique:true,
  },
  email: {
    type:String,
    require:true,
    max:50,
    unique:false,
  },
  password: {
    type:String,
    require:true,
    min:6,
  },
}, { timestamps: true } 
)

module.exports = mongoose.model("User", UserSchema)