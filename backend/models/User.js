import pkg from "mongoose"

const { Schema, ObjectId, model } = pkg

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

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    foodSpaces: {
        type: [ObjectId],
        default: [],
    },
    admin: {
        type: [ObjectId],
        default: [],
    },
    myFood: {
        type: [productSchema],
        default: []
    }
})

const User = model('user', userSchema)

export default User