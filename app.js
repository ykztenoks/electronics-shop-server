import express from "express"
import connectDB from "./db/connect.js"
import morgan from "morgan"
import errorHandler from "./middleware/errorHandler.js"
import userRoutes from "./routes/user.routes.js"
import productRoutes from "./routes/product.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import "dotenv/config"

const app = express()
app.use(express.json())
app.use(morgan("dev"))
//routes
app.use("/user", userRoutes)
app.use("/product", productRoutes)
app.use("/cart", cartRoutes)
//error
app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.clear()
  console.log("Server running on port " + process.env.PORT)
  connectDB()
})
