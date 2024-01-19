const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookCover:{
    imgBuffer:{
      type: Buffer,
    },
    imgExt:{
      type: String
    }
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
    type: [String],
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Book", bookSchema);