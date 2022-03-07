require('dotenv').config()

const productsData = require('./data/products')
const connectDB = require('./config/db')
const Product = require('./models/Product')

connectDB()


// Deletes Everything in Database
// Inputs default Data
const importData = async () => {
    try {
        // Deletes Everything
        await Product.deleteMany({})

        // Inserts default data
        await Product.insertMany(productsData)

        console.log('Data Import Success')

        process.exit()
    } catch (error) {
        console.error("Error with data import", error)
        process.exit(1)
    }
}

importData()
