import pkg from "mongoose"

const { Schema, ObjectId, model } = pkg

const productSchema = new Schema({
    _id: {
        type: ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    imageUrl: {
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
    }
})

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

const userSchema = new Schema({
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

const foodSpaceItemSchema = new Schema({
    product: {
        type: productSchema,
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
        type: userSchema,
        required: false,
    }
})


const foodSpaceSchema = new Schema({
    admin: {
        type: userSchema,
        required: true
    },
    name: {
        type: String,
        required: false,
        default: "home"
    },
    users: {
        type: [userSchema],
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
})

const Pantry = model('foodSpace', foodSpaceSchema)

export default Pantry