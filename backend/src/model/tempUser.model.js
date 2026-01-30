const mongoose = require("mongoose")

const tempUserSchema = new mongoose.Schema({
  fullname: String,
  username: String,
  email: String,
  mobile: Number,
  password: String,
  role: String,
  facebookId: {
    type: String,
    unique: true,
    sparse: true,
  },

  otp: String,
  otpExpiry: Date,
})

const TempUserModel = mongoose.model("TempUser", tempUserSchema)

module.exports = TempUserModel
