const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const bookSchema = new mongoose.Schema({
  bookCover:{
    type: Buffer,
  },
  bookTitle: {
    type: String,
    required: [true, "Title of book is required"],
  },
  bookAuthor: {
    type: String,
    required: [true, "Author of book is required"],
  },
  bookGenre:{
    type: Array,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  // indexes:[{unique: true, fields:['bookTitle','bookAuthor']}]
});

bookSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("Book", bookSchema);