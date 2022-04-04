import pkg from "mongoose"

const { Schema, ObjectId, model } = pkg

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
        type: user_avatarSchema,
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
    brand: {
        type: String,
        default: "generic"
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

// FoodSpace Schemas //
const foodSpaceUserSchema = new Schema({
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
const foodSpaceItemSchema = new Schema({
    product: {
        type: product_productSchema,
        required: true
    },
    quantity: {
        type: Number,
        required: false,
        default: 1
    },
    area: {
        type: String,
        required: false,
        default: "pantry"
    },
    expired: {
        type: Boolean,
        required: false,
        default: false
    },
    purchasedDate: {
        type: Date,
        required: false,
        default: Date.now()
    },
    owner: {
        type: foodSpaceUserSchema,
        required: false,
    }
})

const foodSpaceSchema = new Schema({
    admin: {
        type: foodSpaceUserSchema,
        required: true
    },
    name: {
        type: String,
        required: false,
        default: "home"
    },
    users: {
        type: [foodSpaceUserSchema],
        required: false,
        default: [],
    },
    areas: {
        type: [String],
        required: false,
        default: ['pantry']
    },
    stock: {
        type: [foodSpaceItemSchema],
        required: false,
        default: []
    },
    expiredStock: {
        type: [foodSpaceItemSchema],
        required: false,
        default: []
    }
})

const FoodSpace = model('foodSpace', foodSpaceSchema)

export default FoodSpace