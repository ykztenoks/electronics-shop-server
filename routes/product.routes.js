import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js"

import express from "express"

const router = express.Router()

router.get("/", getProducts)
router.post("/create", createProduct)
router.get("/:id", getProductById)
router.patch("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export default router
