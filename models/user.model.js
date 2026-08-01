import { Schema, model } from "mongoose"

const UserSchema = new Schema(
  {
    fullName: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  {
    timestamps: true,
  },
)

export default model("user", UserSchema)
