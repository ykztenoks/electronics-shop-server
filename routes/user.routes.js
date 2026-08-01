import {
  signup,
  login,
  getAllUsers,
  verify,
} from "../controllers/userController.js"
import express from "express"
import isAuth from "../middleware/isAuth.js"
const router = express.Router()

router.get("/", getAllUsers)
router.post("/signup", signup)
router.post("/login", login)
router.get("/verify", isAuth, verify)

export default router
