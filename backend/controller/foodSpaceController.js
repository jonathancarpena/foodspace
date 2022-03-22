import User from '../models/User.js'
import FoodSpace from '../models/FoodSpace.js'


async function checkIfInFoodSpace(foodSpace_id, user_id) {
    let found = null
    try {
        const foodSpace = await FoodSpace.findById(foodSpace_id)

        if (foodSpace.admin.toString() === user_id) {
            found = "admin"
        } else if (foodSpace.users.includes(user_id)) {
            found = "user"
        } else {
            found = null
        }

    } catch (error) {
        console.error(error)

    }

    return found
}

// Access to Admin and Users
export const getAllFoodSpaces = async (req, res) => {
    const { _id } = req.user
    try {
        const me = await User.findById(_id)

        res.json({
            admin: me.admin,
            foodSpaces: me.foodSpaces
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}

export const getFoodSpaceById = async (req, res) => {
    const { _id } = req.user
    const num = req.params.id
    try {
        const me = await User.findById(_id)
        res.json({
            foodSpace: me.foodSpaces[num + 1]
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}


export const getAdminFoodSpaceById = async (req, res) => {
    const { _id } = req.user
    const num = req.params.id
    try {
        const me = await User.findById(_id)
        res.json({
            foodSpace: me.admin[num + 1]
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}

export const getAllAdminFoodSpace = async (req, res) => {
    const { _id } = req.user

    try {
        const me = await User.findById(_id)
        res.json({
            foodSpace: me.admin
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}


export const createFoodSpace = async (req, res) => {
    try {
        const newFoodSpace = await FoodSpace.create(req.body)
        res.json(newFoodSpace)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}


// Access to Admin only
export const deleteFoodSpace = async (req, res) => {
    // Validate if User is an Admin
    const { _id } = req.user
    const { foodSpace_id } = req.body
    const check = await checkIfInFoodSpace(foodSpace_id, _id)
    if (!check || check === "user") {
        return res.status(400).json({
            message: "Access Denied"
        })
    }

    try {
        const deleteFoodSpace = await FoodSpace.findByIdAndDelete(foodSpace_id)
        res.json({ message: `Removed FoodSpace: #${foodSpace_id}` })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}



// Access to Admin only
export const addUserToFoodSpace = async (req, res) => {
    // Validate if User is an Admin
    const { _id } = req.user
    const { user_id, foodSpace_id } = req.body
    const check = await checkIfInFoodSpace(foodSpace_id, _id)
    if (!check || check === "user") {
        return res.status(400).json({
            message: "Access Denied"
        })
    }

    try {
        const foodSpace = await FoodSpace.findById(foodSpace_id)
        foodSpace.users.push(user_id)
        await foodSpace.save()
        res.json({
            message: `Added user to your FoodSpace: #${foodSpace_id}`,
            foodSpace: foodSpace
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}

// Access to Admin only
export const removeUserFromFoodSpace = async (req, res) => {
    // Validate if User is an Admin
    const { _id } = req.user
    const { user_id, foodSpace_id } = req.body
    const check = await checkIfInFoodSpace(foodSpace_id, _id)
    if (!check || check === "user") {
        return res.status(400).json({
            message: "Access Denied"
        })
    }


    try {
        const foodSpace = await FoodSpace.findByIdAndUpdate(foodSpace_id, {
            "$pull": {
                "users": user_id
            }
        })
        res.json({
            message: `Removed user from your FoodSpace: #${foodSpace_id}`,
            foodSpace: foodSpace
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}


// Access to Admin only
export const addAreaToFoodSpace = async (req, res) => {
    // Validate if User is an Admin
    const { _id } = req.user
    const { area, foodSpace_id } = req.body
    const check = await checkIfInFoodSpace(foodSpace_id, _id)
    if (!check || check === "user") {
        return res.status(400).json({
            message: "Access Denied"
        })
    }


    try {
        const foodSpace = await FoodSpace.findById(foodSpace_id)
        foodSpace.areas.push(area)
        await foodSpace.save()
        res.json({
            message: `Added area to your FoodSpace: #${foodSpace_id}`,
            foodSpace: foodSpace
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}

// Access to Admin and User 
export const addItemToFoodSpace = async (req, res) => {
    // Validate if User is an Admin or User
    const { _id } = req.user
    const { item, foodSpace_id } = req.body
    const check = await checkIfInFoodSpace(foodSpace_id, _id)
    if (!check) {
        return res.status(400).json({
            message: "Access Denied"
        })
    }


    try {
        const foodSpace = await FoodSpace.findById(foodSpace_id)
        foodSpace.stock.push(item)
        await foodSpace.save()
        res.json({
            message: `Added item to FoodSpace: #${foodSpace_id}`,
            foodSpace: foodSpace
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}

// Access to Admin and User 
export const removeItemFromFoodSpace = async (req, res) => {
    // Validate if User is an Admin or User
    const { _id } = req.user
    const { item_id: id, foodSpace_id } = req.body
    const check = await checkIfInFoodSpace(foodSpace_id, _id)
    if (!check) {
        return res.status(400).json({
            message: "Access Denied"
        })
    }

    try {

        const foodSpace = await FoodSpace.findByIdAndUpdate(foodSpace_id, {
            "$pull": {
                "stock": {
                    "_id": id
                }
            }
        })

        res.json({
            message: `Removed item ${id} from your FoodSpace`,
            foodSpace: foodSpace
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}

// Access to Admin and User 
export const updateItemFromFoodSpace = async (req, res) => {
    // Validate if User is an Admin or User
    const { _id } = req.user
    const { item_id: id, foodSpace_id, info } = req.body
    const check = await checkIfInFoodSpace(foodSpace_id, _id)
    if (!check) {
        return res.status(400).json({
            message: "Access Denied"
        })
    }

    const { owner, expired, area } = info

    try {
        const foodSpace = await FoodSpace.findById(foodSpace_id)

        // Grab Index
        const updateIndex = foodSpace.stock.findIndex((item) => (item._id).toString() === id)

        // Grab Item and Update
        let itemToUpdate = foodSpace.stock.find((item) => (item._id).toString() === id)
        owner ? itemToUpdate['owner'] = owner : null
        expired ? itemToUpdate['expired'] = expired : null
        area ? itemToUpdate['area'] = area : null

        // Update FoodSpace
        foodSpace.stock[updateIndex] = itemToUpdate
        foodSpace.save()

        res.json({
            message: `Updated your item in your FoodSpace`,
            foodSpace: foodSpace
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}







