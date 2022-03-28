import pkg from "mongoose"

const { Schema, ObjectId, model } = pkg

const avatarSchema = new Schema({
    emoji: {
        type: String,
        default: '🥧'
    },
    favoriteColor: {
        type: String,
        default: 'bg-red-400'
    }
})
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: false,
        default: 1
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
    author: {
        type: ObjectId,
        required: true
    }
})
const foodSpaceSchema = new Schema({
    _id: {
        type: ObjectId,
        required: true
    },
    name: {
        type: String,
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
        type: [foodSpaceSchema],
        default: [],
    },
    admin: {
        type: [foodSpaceSchema],
        default: [],
    },
    myFood: {
        type: [productSchema],
        default: []
    },
    avatar: {
        type: avatarSchema,
        default: {
            emoji: "🥧",
            favoriteColor: "bg-slate-300"
        }
    }
})

const User = model('user', userSchema)

export default User