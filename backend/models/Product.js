const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    purchasedDate: {
        type: Date,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    expired: {
        type: Boolean,
        default: false
    },
    owner: {
        type: String,
        default: "everyone",
    },
    imageUrl: {
        type: String,
        required: true
    },

})

const Product = mongoose.model('product', productSchema)

module.exports = Product