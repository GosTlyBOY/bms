const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const argon = require("argon2");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// userSchema.pre("save", async function () {
//   this.password = await bcrypt.hash(this.password,10);
// });

module.exports = mongoose.model("User", userSchema);