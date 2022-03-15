import pkg from "mongoose"

const { Schema, model, ObjectId } = pkg

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    measurement: {
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
    author: {
        type: ObjectId,
        required: true
    }
})

const Product = model('product', productSchema)

export default Product