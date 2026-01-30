const UserModel = require("../model/user.model")
const cacheInstance = require("../services/cache.service")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const sendMail = require("../services/mail.service")
const resePassTemp = require("../utils/email.template")
const sendFilesToStorage = require("../services/storage.service")
const { getCookieOptions, getClearCookieOptions } = require("../utils/cookie.utils")
const otpVerifyTemp = require("../utils/email.verify.temp")
const { sendSMS } = require("../services/message.service")
const { emailQueue } = require("../queues/emailQueue")
const TempUserModel = require("../model/tempUser.model")

const registerController = async (req, res) => {
  try {
    let { fullname, email, username, password, mobile, role } = req.body

    if (!fullname || !email || !username || !password || !mobile || !role) {
      return res.status(404).json({
        message: "All fields are required",
      })
    }

    let existingUser = await UserModel.findOne({ email })

    if (existingUser)
      return res.status(422).json({
        message: "User already exists",
      })

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes

    const hashedPassword = await bcrypt.hash(password, 10)

    await TempUserModel.findOneAndUpdate(
      { email },
      {
        fullname,
        username,
        email,
        mobile,
        password: hashedPassword,
        role,
        otp,
        otpExpiry,
      },
      { upsert: true }
    )

    await emailQueue.add("verify-email", {
      email,
      username,
      otp,
      otpExpiry,
    })

    // let token = newUser.generateToken();
    // res.cookie("token", token, getCookieOptions());

    return res.status(201).json({
      message: "OTP sent to your email. please verify!",
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal server error ",
      error: error,
    })
  }
}

const loginController = async (req, res) => {
  try {
    let { contact, password } = req.body

    if (!contact || !password) {
      return res.status(404).json({
        message: "All fields are required",
      })
    }

    const isEmail = contact.includes("@")
    const user = isEmail
      ? await UserModel.findOne({ email: contact })
      : await UserModel.findOne({ mobile: contact })

    if (!user)
      return res.status(404).json({
        message: "User not found",
      })

    let cp = await user.comparePass(password)

    if (!cp)
      return res.status(400).json({
        message: "Invalid credentials",
      })

    let token = user.generateToken()
    console.log("token generated:", token ? "yes" : "no")
    res.cookie("token", token, getCookieOptions())

    return res.status(200).json({
      message: `user logined successfully.`,
      user: user,
    })
  } catch (error) {
    console.log("error in login->", error)
    return res.status(500).json({
      message: "Internal server error ",
      error: error,
    })
  }
}

const verifyEmailByOTPController = async (req, res) => {
  try {
    const { contact, otp } = req.body

    console.log(contact, otp)

    const tempUser = await TempUserModel.findOne({ email: contact })

    console.log(tempUser)

    if (!tempUser) {
      return res.status(400).json({ message: "OTP expired" })
    }

    if (tempUser.otpExpiry < Date.now()) {
      await TempUserModel.deleteOne({ email: contact })
      return res.status(400).json({ message: "OTP expired" })
    }

    if (tempUser.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" })
    }

    let newUser = await UserModel.create({
      fullname: tempUser.fullname,
      username: tempUser.username,
      email: tempUser.email,
      mobile: tempUser.mobile,
      password: tempUser.password,
      role: tempUser.role,
      isEmailVerified: true,
    })

    let token = newUser.generateToken()
    console.log("token generated:", token ? "yes" : "no")
    res.cookie("token", token, getCookieOptions())

    await TempUserModel.deleteOne({ email: contact })

    await emailQueue.add("welcome-email", {
      email: newUser.email,
      name: newUser.fullname,
      role: newUser.role,
    })

    return res.status(200).json({
      message: "OTP verified successfully",
      token,
      user: newUser,
    })
  } catch (error) {
    console.log("error in vrification->", error)
    return res.status(500).json({
      message: "Internal server error ",
      error: error,
    })
  }
}

const resendOTPController = async (req, res) => {
  try {
    const { contact } = req.body

    if (!contact) {
      return res.status(400).json({ message: "Email is required" })
    }

    const tempUser = await TempUserModel.findOne({ email: contact })

    if (!tempUser) {
      return res.status(404).json({
        message: "Session expired. Please register again.",
      })
    }

    // 🔐 Rate limit (Redis or Cache)
    const key = `otp-resend:${contact}`
    const attempts = await cacheInstance.get(key)

    if (attempts && Number(attempts) >= 3) {
      return res.status(429).json({
        message: "Too many requests. Try again after 10 minutes.",
      })
    }

    // 🔄 Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000)

    tempUser.otp = otp
    tempUser.otpExpiry = otpExpiry
    await tempUser.save()

    // ⏱️ Increase rate limit count
    await cacheInstance.set(key, (Number(attempts) || 0) + 1, "EX", 600)

    // 📬 Queue email
    await emailQueue.add("verify-email", {
      email: tempUser.email,
      username: tempUser.username,
      otp,
      otpExpiry,
    })

    return res.status(200).json({
      message: "New OTP sent to your email",
    })
  } catch (err) {
    console.log("Resend OTP error →", err)
    return res.status(500).json({
      message: "Internal server error",
    })
  }
}

const logoutController = async (req, res) => {
  try {
    let token = req.cookies.token

    if (!token) {
      return res.status(404).json({
        message: "token not found",
      })
    }

    await cacheInstance.set(token, "blacklisted")

    res.clearCookie("token", getClearCookieOptions())

    return res.status(200).json({
      message: "user logged out successfully!",
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal server error ",
      error: error,
    })
  }
}

const updateUserController = async (req, res) => {
  try {
    let { fullname, email, username, mobile, role } = req.body

    if (!fullname || !email || !username || !mobile || !role) {
      return res.status(404).json({
        message: "All fields are required",
      })
    }

    let uploadedImage = [] //undefined
    if (req.file) {
      uploadedImage = await sendFilesToStorage(req.file.buffer, req.file.originalname)
    }

    let updatedUser = await UserModel.findOneAndUpdate(
      { email },
      {
        fullname,
        email,
        username,
        mobile,
        role,
        profileLogo: uploadedImage.url || "",
      }
    )

    return res.status(201).json({
      message: "user updated successfully",
      user: updatedUser,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal server error ",
      error: error,
    })
  }
}

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body

    if (!email) {
      return res.status(404).json({
        message: "email not found",
      })
    }

    let user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      })
    }

    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_RAW_SECRET, {
      expiresIn: "5min",
    })

    console.log(resetToken)

    // Use environment variable for reset link base URL
    const baseUrl = process.env.SERVER_ORIGIN
    let resetLink = `${baseUrl}/auth/reset-password/${resetToken}`

    // let resetTemp = resePassTemp(user.fullname, resetLink)

    // await sendMail(email, "Reset your Password", resetTemp)
    const fullname = user.fullname
    await emailQueue.add("reset-password", {
      email,
      fullname,
      resetLink,
    })

    return res.status(201).json({
      message: "reset link sended at your registered email!",
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal server error ",
      error: error,
    })
  }
}

const resetPasswordController = async (req, res) => {
  try {
    let token = req.params.token
    if (!token) {
      return res.status(404).json({
        message: "token not found",
      })
    }

    let decode = jwt.verify(token, process.env.JWT_RAW_SECRET)

    return res.render("index.ejs", { id: decode.id })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal server error ",
      error: error,
    })
  }
}

const updatePasswordController = async (req, res) => {
  try {
    let id = req.params.id
    let { password } = req.body
    if (!id) {
      return res.status(404).json({
        message: "id not found",
      })
    }

    let hashPass = await bcrypt.hash(password, 11)

    let updatedPassUser = await UserModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        password: hashPass,
      },
      {
        new: true,
      }
    )

    const email = updatedPassUser.email
    const name = updatedPassUser.fullname

    console.log(email, name)

    await emailQueue.add("password-updated", {
      email,
      name,
    })

    return res.status(200).json({
      message: "password updated successfully!",
      upadatedUser: updatedPassUser,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal server error ",
      error: error,
    })
  }
}

const getProfileController = async (req, res) => {
  try {
    let user = req.user ///authmiddleware sets this
    return res.status(200).json({
      message: "profile fetched successfully!",
      user: user,
    })
  } catch (error) {
    return res.status(500).json({
      message: "internal server error!",
      error: error,
    })
  }
}

const googleController = async (req, res) => {
  try {
    // console.log("user->",req.user);
    const profile = req.user

    // Example: Create/find user in DB
    let user = await UserModel.findOne({ email: profile.emails[0].value })
    if (!user) {
      user = await UserModel.create({
        fullname: profile.displayName,
        email: profile.emails[0].value,
        username: profile.displayName.split(" ")[0],
        password: "google_auth", // placeholder, not used
        profileLogo: profile.photos[0].value,
      })
    }

    const token = user.generateToken()
    console.log("Google OAuth token generated:", token ? "✓" : "✗")

    res.cookie("token", token, getCookieOptions())
   
    await emailQueue.add("google_alert",{
      email:user.email,
      name:user.fullname
    })

    const redirectUrl = process.env.CLIENT_ORIGIN
    res.redirect(redirectUrl)
  } catch (error) {
    console.log("error in callback url->", error)
    const redirectUrl = process.env.CLIENT_ORIGIN
    res.redirect(redirectUrl)
  }
}

const facebookController = async (req, res) => {
  try {
    // console.log("user->",req.user);
    const profile = req.user

    let email =
      profile.emails && profile.emails[0]?.value
        ? profile.emails[0].value
        : `${profile.id}@facebook.com`

    // Example: Create/find user in DB
    let user = await UserModel.findOne({ email })
    if (!user) {
      user = await UserModel.create({
        fullname: profile.displayName,
        email: profile.emails[0].value,
        username: profile.displayName.split(" ")[0],
        password: "facebook_auth", // placeholder, not used
        profileLogo: profile.photos[0].value,
      })
    }

    const token = user.generateToken()
    console.log("facebook OAuth token generated:", token ? "✓" : "✗")

    res.cookie("token", token, getCookieOptions())

    const redirectUrl = process.env.CLIENT_ORIGIN
    res.redirect(redirectUrl)
  } catch (error) {
    console.log("error in callback url->", error)
    const redirectUrl = process.env.CLIENT_ORIGIN
    res.redirect(redirectUrl)
  }
}

module.exports = {
  registerController,
  loginController,
  logoutController,
  forgotPasswordController,
  resetPasswordController,
  updatePasswordController,
  getProfileController,
  googleController,
  facebookController,
  updateUserController,
  verifyEmailByOTPController,
  resendOTPController,
}
