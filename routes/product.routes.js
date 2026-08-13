import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js"
import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import express from "express"
import "dotenv/config"
const router = express.Router()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.get("/", getProducts)
router.post("/create", createProduct)
router.get("/:id", getProductById)
router.patch("/:id", updateProduct)
router.delete("/:id", deleteProduct)
//upload image route
router.post("/upload-image", upload.single("image"), (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No image provided" })

    const stream = cloudinary.uploader.upload_stream(
      { folder: "electronics-shop" },
      (error, result) => {
        if (error) return res.status(500).json({ message: error })
        res.status(200).json({ url: result.secure_url })
      },
    )

    stream.end(req.file.buffer)
  } catch (error) {
    next(error)
  }
})

export default router
