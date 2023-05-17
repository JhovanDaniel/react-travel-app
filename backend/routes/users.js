const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require('bcrypt');

//register
router.post("/register", async (req, res) => {
  try{
    //generate new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //create new user
    const newUser = new User({
      username: req.body.username,
      email:req.body.email,
      password:hashedPassword,
    })

    //save user and send response
    const user = await newUser.save();
    res.status(200).json(user._id)

  }catch(err){
    res.status(500).json(err)
  }
})

//login
router.post("/login", async (req, res) => {
  try{
    //find user
    const user = await User.findOne({username: req.body.username})
    // !user && res.status(400).json("Wrong username or password");
    if (!user){
      return(res.status(400).json("Wrong username or password"));
    }
    
    //validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    // !validPassword && res.status(400).json("Wrong username or password");
    if (!validPassword){
      return(res.status(400).json("Wrong username or password"));
    }

    //send response
    res.status(200).json({user: user.username, id: user.id})

  }catch(err){
    return res.status(500).json(err)
  }
  return
})


module.exports = router