import Cart from "../models/Cart.model.js"

const addItemToCart = async (req, res, next) => {
  try {
    const { product } = req.body
    const cart = await Cart.findOne({ owner: req.user._id })
    if (!cart) {
      const createdCart = await Cart.create({
        owner: req.user._id,
        products: [product],
        total: (product.price * product.quantity).toFixed(2),
      })

      return res
        .status(201)
        .json({ message: "Cart created and products added successfully" })
    }

    const productInCart = cart.products.find((item) => {
      return item.product.toString() === product.product
    })

    console.log(productInCart)
    if (productInCart) {
      productInCart.quantity = product.quantity
    } else {
      cart.products.push(product)
    }

    cart.total = cart.products
      .reduce((acc, product) => (acc += product.price * product.quantity), 0)
      .toFixed(2)
    await cart.save()

    res.status(200).json({ message: "Product added to cart succesfully", cart })
  } catch (error) {
    next(error)
  }
}

const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ owner: req.user._id })
    // .populate({
    //   path: "products",
    //   populate: "product",
    // })

    res.status(200).json(cart)
  } catch (error) {
    next(error)
  }
}

const removeItemFromCart = async (req, res, next) => {
  try {
    const { itemId } = req.params
    const cart = await Cart.findOne({ owner: req.user._id })
    if (!cart) {
      return res.status(400).json({ message: "Cart doesn't exist" })
    }

    cart.products = cart.products.filter((item) => {
      return item._id.toString() !== itemId
    })

    cart.total = cart.products
      .reduce((acc, product) => (acc += product.price * product.quantity), 0)
      .toFixed(2)
    await cart.save()

    res.status(200).json({ message: "Product removed successfully" })
  } catch (error) {
    next(error)
  }
}
export { addItemToCart, getCart, removeItemFromCart }
