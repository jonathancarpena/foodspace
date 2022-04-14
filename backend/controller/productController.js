import Product from '../models/Product.js'
import User from '../models/User.js'

export const getAllProducts = async (req, res) => {
    console.log('GRABBING ALL PRODUCTS')
    try {
        const products = await Product.find({})
        return res.status(200).json(products)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

export const getProductById = async (req, res) => {
    console.log('GRABBING PRODUCT BY ID')
    try {
        const product = await Product.findById(req.params.id)
        return res.status(200).json(product)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


export const createProduct = async (req, res) => {
    console.log('CREATING PRODUCT')
    const { _id: user_id } = req.user
    const { product } = req.body

    try {
        const newProduct = await Product.create(product)
        const user = await User.findById(user_id)
        user.myProducts.push(newProduct)
        await user.save()

        return res.status(200).json({
            product: newProduct,
            message: `Successfully removed the product`
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


export const deleteProduct = async (req, res) => {
    console.log('DELETING PRODUCT')
    const { item } = req.body
    const { _id: user_id } = req.user

    const product = await Product.findById(item._id)

    if (product.author._id.toString() !== user_id) {
        return res.status(400).json({
            message: "Access Denied"
        })
    }

    try {
        // Deleting Product from DB
        const deletedProduct = await Product.findByIdAndDelete(product._id)

        // Deleting Product from Users MyProducts
        const myProducts = await User.findByIdAndUpdate(user_id, {
            "$pull": {
                "myProducts": {
                    "_id": product._id
                }
            }
        })

        return res.status(200).json({
            message: `Successfully removed the product`
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

export const updateProduct = async (req, res) => {
    console.log('UPDATING PRODUCT')
    const { _id: user_id } = req.user
    const { data } = req.body

    const product = await Product.findById(data._id)

    // Validating User is Author
    if (product.author._id.toString() !== user_id) {
        return res.status(400).json({
            message: "Access Denied"
        })
    }

    try {
        // Updating Product
        const updatedProduct = await Product.findByIdAndUpdate(data._id, data)

        // Updating User's My Product
        const user = await User.findById(user_id)
        const indexToUpdate = user.myProducts.findIndex((item) => item._id.toString() === data._id)
        user.myProducts[indexToUpdate] = updatedProduct
        await user.save()

        return res.status(200).json({
            product: updatedProduct,
            message: `Successfully updated the product`
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


export const myProducts = async (req, res) => {
    console.log('MY PRODUCTS')
    const { _id: user_id } = req.user

    const user = await User.findById(user_id)

    if (!user) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    try {
        return res.status(200).json({
            products: user.myProducts
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}
