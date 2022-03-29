import pkg from "mongoose"
const { Schema, ObjectId, model } = pkg





// User Schemas //
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

// Should be Imported from Product
const product_authorSchema = new Schema({
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
        type: avatarSchema,
        required: true
    }
})
const product_lifeSpanSchema = new Schema({
    value: {
        type: Number,
        default: '7'
    },
    time: {
        type: String,
        default: 'day'
    }
})
const product_productSchema = new Schema({
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
        type: product_lifeSpanSchema,
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
        type: product_authorSchema,
        required: true
    },
})

// User Schemas //
const userFoodSpaceSchema = new Schema({
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
        type: [userFoodSpaceSchema],
        default: [],
    },
    admin: {
        type: [userFoodSpaceSchema],
        default: [],
    },
    myProducts: {
        type: [product_productSchema],
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