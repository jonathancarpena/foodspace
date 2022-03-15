import pkg from "mongoose"

const { Schema, ObjectId, model } = pkg

const foodSpaceItemSchema = new Schema({
    product_id: {
        type: ObjectId,
        required: true
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
        type: ObjectId,
        required: false,
    }
})

const foodSpaceSchema = new Schema({
    admin: {
        type: ObjectId,
        required: true
    },
    users: {
        type: [ObjectId],
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