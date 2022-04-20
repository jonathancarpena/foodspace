import pkg from "mongoose"
import moment from "moment"
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

const tempLifeSpanSchema = new Schema({
    refrigerator: {
        type: lifeSpanSchema,
        default: {
            value: 1,
            time: 'week'
        }
    },
    freezer: {
        type: lifeSpanSchema,
        default: {
            value: 1,
            time: 'year'
        }
    },
    pantry: {
        type: lifeSpanSchema,
        default: {
            value: 1,
            time: 'day'
        }
    },
})
const productSchema = new Schema({
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
        type: tempLifeSpanSchema,
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
        type: authorSchema,
        required: true
    },
})

const Product = model('product', productSchema)

export default Product