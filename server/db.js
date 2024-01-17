const mongoose = require('mongoose')
const { MONGO_URL, PORT } = process.env;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL)

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB