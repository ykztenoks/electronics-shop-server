import Product from "../models/Product.model.js"

const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, quantityInStock, brand, imageURL, year } =
      req.body

    const created = await Product.create({
      name,
      price,
      description,
      quantityInStock,
      brand,
      imageURL,
      year,
    })

    res.status(201).json(created)
  } catch (error) {
    next(error)
  }
}
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()

    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
}
const getProductById = async (req, res, next) => {
  const { id } = req.params

  const product = await Product.findOne({ _id: id })

  res.status(200).json(product)
  try {
  } catch (error) {
    next(error)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    // const { name, price, description, quantityInStock, brand, imageURL, year } =
    //   req.body

    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true })

    // const {
    //    name, price, description, quantityInStock, brand, imageURL, year
    // } = req.body

    // const toUpdate = {
    //    name, price, description, quantityInStock, brand, imageURL, year
    // }

    // for (let key in toUpdate) {
    //   if (toUpdate[key] !== "undefined") {
    //     foundCountry[key] = toUpdate[key]
    //   }
    // }

    // foundCountry.save()
    res.status(200).json(updated)
  } catch (error) {
    next(error)
  }
}
const deleteProduct = async (req, res, next) => {
  const { id } = req.params

  const product = await Product.findByIdAndDelete(id)

  res.status(200).json({ message: "deleted succesfully" })
  try {
  } catch (error) {
    next(error)
  }
}

export {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
}
