import express from "express"
import {
  addItemToCart,
  getCart,
  removeItemFromCart,
} from "../controllers/cartController.js"
import isAuth from "../middleware/isAuth.js"
const router = express.Router()

router.get("/", isAuth, getCart)
router.post("/add", isAuth, addItemToCart)
router.patch("/:itemId", isAuth, removeItemFromCart)

export default router
