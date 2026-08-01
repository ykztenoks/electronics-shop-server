import { Schema, model } from "mongoose"

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, min: 0, required: true },
    descripion: { type: String },
    quantityInStock: { type: Number, min: 0 },
    brand: { type: String },
    imageURL: { type: String },
    year: { type: Number, min: 1950, max: 2027 },
  },
  {
    timestamps: true,
  },
)

export default model("product", ProductSchema)
