import { Schema, model } from "mongoose"

const CartItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "product" },
    quantity: { type: Number, min: 1, required: true },
    price: { type: Number, min: 0, required: true },
  },
  {
    timestamps: true,
  },
)

const CartSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
    products: [CartItemSchema],
    total: { type: Number, min: 0, required: true },
  },
  { timestamps: true },
)

export default model("cart", CartSchema)
