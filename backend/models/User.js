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
    brand: {
        type: String,
        default: "generic"
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

// Should be Imported from FoodSpace
const foodSpace_foodSpaceUserSchema = new Schema({
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
const foodSpace_foodSpaceItemSchema = new Schema({
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
        type: foodSpace_foodSpaceUserSchema,
        required: false,
    }
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
    },
    expiredStock: {
        type: [foodSpace_foodSpaceItemSchema],
        required: false,
        default: [],
    },
    admin: {
        type: avatarSchema,
        required: true
    },
    users: {
        type: [avatarSchema],
        required: false
    }
})
const userTaskSchema = new Schema({
    foodSpace_id: {
        type: ObjectId,
        required: true
    },
    foodSpace_name: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
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
    },
    tasks: {
        type: [userTaskSchema],
        default: []
    }
})

const User = model('user', userSchema)
export default User