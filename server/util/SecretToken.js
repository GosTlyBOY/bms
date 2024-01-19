require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  return jwt.sign({_id: id}, process.env.TOKEN_KEY, {
    expiresIn: "3 days",
  });
};