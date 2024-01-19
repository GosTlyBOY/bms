const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.UserVerification = async (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.json({ status: false })
  }

  try{
    const decoded = jwt.verify(token, process.env.TOKEN_KEY)
    const user = await User.findById(decoded._id)
    if(!user) return res.json({ status: false })

    req.user = user;
    return next();
  }
  catch(error){
    console.log(error)
   return res.status(501).json({ status: false })
  }
}  
