import bcrypt from "bcrypt"
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password")

    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

const signup = async (req, res, next) => {
  try {
    const { email, fullName, password } = req.body

    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "Please provide all fields" })
    }

    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Provide a valid email" })
    }
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be 8 characters long and contain one uppercase and one lowercase character, a number, and a special character.",
      })
      return
    }

    const foundUser = await User.findOne({ email })
    if (foundUser) {
      return res.status(409).json({ message: "User already exists" })
    }

    const salts = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salts)

    const createdUser = await User.create({
      email,
      fullName,
      password: hashedPassword,
    })

    res.status(201).json(createdUser)
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "please provide email or username and password" })
    }

    const foundUser = await User.findOne({ email })

    if (!foundUser) {
      return res.status(404).json({ message: "This user does not exist" })
    }

    const passwordCheck = await bcrypt.compare(password, foundUser.password)

    if (!passwordCheck) {
      return res.status(401).json({ message: "Password incorrect" })
    }

    const token = await jwt.sign(
      {
        email: foundUser.email,
        fullName: foundUser.fullName,
        _id: foundUser._id,
      },
      process.env.TOKEN_SECRET,
      { algorithm: "HS256", expiresIn: "1h" },
    )

    delete foundUser._doc.password

    res
      .status(200)
      .json({ message: "Logged in succesfully", token, user: foundUser })
  } catch (error) {
    console.log(error)
  }
}

const verify = async (req, res, next) => {
  try {
    console.log(req.user)
    res.status(200).json(req.user)
  } catch (error) {
    next(error)
  }
}

export { getAllUsers, login, signup, verify }
