import pkg from "mongoose"

const { Schema, model, ObjectId } = pkg

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: false,
        default: "food"
    },
    unit: {
        type: String,
        default: "count"
    },
    imageUrl: {
        type: String,
        required: true
    },
    expirationLifeSpan: {
        type: Number,
        required: false,
        default: 7
    },
    barcode: {
        type: Number,
        required: false,
    },
    author: {
        type: ObjectId,
        required: true
    },

})

const Product = model('product', productSchema)

export default Product