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
                ...item
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
            author: {
                _id: user[0]._id,
                first_name: user[0].first_name,
                last_name: user[0].last_name,
                email: user[0].email,
                avatar: user[0].avatar,
            }
        }
    })

    return addAuthor
}

const populateMyProducts = async () => {
    const user = (await User.find())[0]
    const products = await Product.find()
    user.myProducts = [...user.myProducts, ...products]
    await User.findByIdAndUpdate(user._id, user)
}

const addFoodSpaceAdmin = async () => {
    const user = (await User.find())[0]
    const foodSpace = (await FoodSpace.find())[0]
    const foodSpaceModel = {
        _id: foodSpace._id,
        name: foodSpace.name,
        expiredStock: foodSpace.expiredStock,
        admin: {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            avatar: user.avatar
        },
        users: foodSpace.users
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
        console.log('CLEARING DB')
        await Product.deleteMany({})
        await User.deleteMany({})
        await FoodSpace.deleteMany({})

        // Inserts default data
        console.log("CREATING USER")
        const newUser = await createUser()
        await User.insertMany([newUser])

        console.log("INPUTTING DEFAULT PRODUCTS")
        const newProducts = await createProducts()
        await Product.insertMany(newProducts)

        console.log("CREATING FOODSPACE")
        const newFoodSpace = await createFoodSpace()
        await FoodSpace.insertMany(newFoodSpace)

        // Add Products to users myProducts section
        console.log("POPULATING USERS MY PRODUCTS")
        await populateMyProducts()

        // Add  Admin to FoodSpace\
        console.log("ADDING ADMIN TO FOODSPACE")
        await addFoodSpaceAdmin()

        console.log('Data Import Success')
        process.exit()
    } catch (error) {
        console.error("Error with data import", error)
        process.exit(1)
    }
}


importData()


