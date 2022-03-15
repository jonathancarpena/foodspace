import Product from '../models/Product.js'
import User from '../models/User.js'

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.json(product)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}


export const addProduct = async (req, res) => {
    const { _id: user_id } = req.user

    try {
        const newProduct = await Product.create(req.body)
        const user = await User.findById(user_id)
        user.myFood = [...user.myFood, newProduct]
        await User.findByIdAndUpdate(user_id, user)

        res.json({
            product: newProduct,
            message: `Successfully removed the product`
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}


export const removeProduct = async (req, res) => {
    const { product_id } = req.body
    const { _id: user_id } = req.user

    const product = await Product.findById(product_id)

    if (product.author.toString() !== req.user._id) {
        return res.status(400).json({
            message: "Access Denied"
        })
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(product_id)

        const myFood = await User.findByIdAndUpdate(user_id, {
            "$pull": {
                "myFood": {
                    "_id": product_id
                }
            }
        })

        res.json({
            message: `Successfully removed the product`
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}

export const updateProduct = async (req, res) => {
    const { product_id, data } = req.body
    const { _id: user_id } = req.user

    const product = await Product.findById(product_id)

    if (product.author.toString() !== user_id) {
        return res.status(400).json({
            message: "Access Denied"
        })
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(product_id, data)
        res.json({
            product: updatedProduct,
            message: `Successfully updated the product`
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}
