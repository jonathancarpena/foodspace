import dotenv from "dotenv"
dotenv.config()

// Models
import Product from './models/Product.js'
import User from './models/User.js'
import FoodSpace from './models/FoodSpace.js'

// Sample Data
import productsData from './data/products.js'
import { userData, generateHashPassword } from './data/user.js'
import connectDB from './config/db.js'



connectDB()

const createFoodSpace = async () => {
    const user = await User.find()
    const foodSpace_items = (await Product.find()).map((item) => {
        return {
            product: {
                _id: item._id,
                name: item.name,
                imageUrl: item.imageUrl,
                measurement: item.measurement
            },
            owner: {
                _id: user[0]._id,
                first_name: user[0].first_name,
                last_name: user[0].last_name,
                email: user[0].email,
                avatar: user[0].avatar,
            }

        }
    })


    const admin = {
        _id: user[0]._id,
        first_name: user[0].first_name,
        last_name: user[0].last_name,
        email: user[0].email,
        avatar: user[0].avatar,
    }


    const populatedFoodSpace = {
        admin: admin,
        stock: foodSpace_items
    }

    return populatedFoodSpace
}

const createUser = async () => {
    let complete = userData
    complete['password'] = await generateHashPassword("test123")
    return complete
}

const createProducts = async () => {
    const user = await User.find()
    const addAuthor = productsData.map((item) => {
        return {
            ...item,
            author: user[0]._id
        }
    })

    return addAuthor
}

const populateMyFood = async () => {
    const user = (await User.find())[0]
    const products = await Product.find()
    user.myFood = [...user.myFood, ...products]
    await User.findByIdAndUpdate(user._id, user)
}

const addFoodSpaceAdmin = async () => {
    const user = (await User.find())[0]
    const foodSpace = (await FoodSpace.find())[0]
    const foodSpaceModel = {
        _id: foodSpace._id,
        name: foodSpace.name
    }

    // Adding foodSpace to admin 
    user.admin.push(foodSpaceModel)
    await user.save()
}
// Deletes Everything in Database
// Inputs default Data
const importData = async () => {

    try {
        // Deletes Everything
        await Product.deleteMany({})
        await User.deleteMany({})
        await FoodSpace.deleteMany({})

        // Inserts default data
        const newUser = await createUser()
        await User.insertMany([newUser])

        const newProducts = await createProducts()
        await Product.insertMany(newProducts)

        const newFoodSpace = await createFoodSpace()
        await FoodSpace.insertMany(newFoodSpace)

        // Add Products to users myFood section
        await populateMyFood()

        // Add  Admin to FoodSpace
        await addFoodSpaceAdmin()

        console.log('Data Import Success')
        process.exit()
    } catch (error) {
        console.error("Error with data import", error)
        process.exit(1)
    }
}


importData()


