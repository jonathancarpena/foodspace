import dotenv from "dotenv"
import pkg from 'mongoose'

dotenv.config()
const { connect } = pkg

async function connectDB() {
    try {
        await connect(process.env.MONGO_URI)
        console.log('MongoDB connection Success')
    } catch (error) {
        console.error("MongoDB connection Fail")
        process.exit(1)
    }
}

export default connectDB;