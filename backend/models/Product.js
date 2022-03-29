import pkg from "mongoose"
const { Schema, model, ObjectId } = pkg

// Should be imported from User
const user_avatarSchema = new Schema({
    emoji: {
        type: String,
        default: '🥧'
    },
    favoriteColor: {
        type: String,
        default: 'bg-red-400'
    }
})

// Product Schemas //
const authorSchema = new Schema({
    _id: {
        type: ObjectId,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: user_avatarSchema,
        required: true
    }
})
const lifeSpanSchema = new Schema({
    value: {
        type: Number,
        default: '7'
    },
    time: {
        type: String,
        default: 'day'
    }
})
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
    image: {
        type: String,
        required: false,
        default: "🍽"
    },
    lifeSpan: {
        type: lifeSpanSchema,
    },
    barcode: {
        type: Number,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: authorSchema,
        required: true
    },
})

const Product = model('product', productSchema)

export default Product