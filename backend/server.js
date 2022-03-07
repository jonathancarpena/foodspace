require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')

// Conncet to MongoDB
connectDB();

// Express Server
const app = express()

// For JSON Data
app.use(express.json())

// Routes: (extension, routes)
app.use("/api/products", productRoutes)


// Port server is running on
const PORT = process.env.PORT || 5000
app.listen(PORT,
    () => console.log(`Server running on port ${PORT}`)
)