import pkg from "mongoose"
import moment from "moment"

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
        default: 7
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
    type: {
        type: String,
        required: false,
        default: 'refrigerator'
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