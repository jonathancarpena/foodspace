import pkg from "mongoose"
import moment from "moment"
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
const product_tempLifeSpanSchema = new Schema({
    refrigerator: {
        type: product_lifeSpanSchema,
        default: {
            value: 1,
            time: 'week'
        }
    },
    freezer: {
        type: product_lifeSpanSchema,
        default: {
            value: 1,
            time: 'year'
        }
    },
    pantry: {
        type: product_lifeSpanSchema,
        default: {
            value: 1,
            time: 'day'
        }
    },
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
    image: {
        type: String,
        required: false,
        default: "🍽"
    },
    lifeSpan: {
        type: product_tempLifeSpanSchema,
        required: false,
        default: {
            refrigerator: {
                value: 1,
                time: 'week'
            },
            freezer: {
                value: 1,
                time: 'year'
            },
            pantry: {
                value: 1,
                time: 'day'
            },
        }
    },
    barcode: {
        type: Number,
        required: false,
    },
    createdAt: {
        type: String,
        default: moment(new Date(Date.now())).format("YYYY-MM-DD")
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
    unit: {
        type: String,
        default: "count"
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
        type: String,
        required: false,
        default: moment(new Date(Date.now())).format("YYYY-MM-DD")
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
    type: {
        type: String,
        required: false,
        default: 'refrigerator'
    },
    expiredStock: {
        type: [foodSpace_foodSpaceItemSchema],
        required: false,
        default: [],
    },
    admin: {
        type: foodSpace_foodSpaceUserSchema,
        required: true
    },
    users: {
        type: [foodSpace_foodSpaceUserSchema],
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