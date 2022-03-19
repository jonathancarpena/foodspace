import dotenv from "dotenv"
import express, { json } from 'express'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import foodSpaceRoutes from './routes/foodSpaceRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'
import cookieParser from "cookie-parser"
import { urlencoded } from "express"

dotenv.config()

// Conncet to MongoDB
connectDB();

// Express Server
const app = express()

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

// For JSON Data
app.use(cookieParser())
app.use(json())
app.use(urlencoded({
    extended: false
}))




// Routes: (extension, routes)
app.use("/api/products", productRoutes)
app.use("/api/foodSpace", foodSpaceRoutes)
app.use("/api/user", userRoutes)


// Port server is running on
const PORT = process.env.PORT || 5000
app.listen(PORT,
    () => console.log(`Server running on port ${PORT}`)
)