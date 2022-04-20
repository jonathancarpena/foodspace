import User from '../models/User.js'
import FoodSpace from '../models/FoodSpace.js'
import moment from 'moment'


async function checkIfInFoodSpace(foodSpace_id, user_id) {
    let found = null
    try {
        const foodSpace = await FoodSpace.findById(foodSpace_id)

        if (foodSpace.admin._id.toString() === user_id) {
            found = "admin"
        }

        for (const user of foodSpace.users) {
            if (user._id.toString() === user_id.toString()) {
                found = "user"
            }
        }

    } catch (error) {
        console.error(error)

    }

    return found
}

// Access to Admin and Users
export const getAllFoodSpaces = async (req, res) => {
    const { _id } = req.user
    const userExist = await checkIfInFoodSpace(foodSpace_id, _id)

    if (!userExist) {
        return res.status(400).json({
            message: "Access Denied"
        })
    }
    try {
        const me = await User.findById(_id)
        return res.status(200).json({
            admin: me.admin,
            foodSpaces: me.foodSpaces
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

export const getFoodSpaceById = async (req, res) => {
    const { _id } = req.user
    const foodSpace_id = req.params.id
    console.log(foodSpace_id)

    const userExist = await checkIfInFoodSpace(foodSpace_id, _id)
    if (!userExist) {
        return res.status(400).json({
            message: "Access Denied"
        })
    }

    try {
        const foodSpace = await FoodSpace.findById(foodSpace_id)
        return res.status(200).json({
            foodSpace
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


export const getAdminFoodSpaceById = async (req, res) => {
    console.log('FETCHING ADMIN FOODSPACE')
    const { _id } = req.user
    const foodSpace_id = req.params.id
    let foodSpace;
    try {
        const userIsAdmin = await checkIfInFoodSpace(foodSpace_id, _id)
        if (!userIsAdmin) {
            return res.status(400).json({
                message: "Access Denied"
            })
        }

        foodSpace = await FoodSpace.findById(foodSpace_id)
        return res.status(200).json({
            foodSpace
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

export const getAllAdminFoodSpace = async (req, res) => {
    const { _id } = req.user

    try {
        const me = await User.findById(_id)
        return res.status(200).json({
            foodSpace: me.admin
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


export const createFoodSpace = async (req, res) => {
    const { _id } = req.user

    console.log('CREATING FOODSPACE')
    try {

        // Creating a new FoodSpace
        const newFoodSpace = await FoodSpace.create(req.body)

        // Adding FoodSpace to User
        const user = await User.findById(_id)

        const foodSpaceModel = {
            _id: newFoodSpace._id,
            name: newFoodSpace.name,
            expiredStock: newFoodSpace.expiredStock,
            admin: newFoodSpace.admin,
            users: newFoodSpace.users
        }
        user.admin.push(foodSpaceModel)
        await user.save()

        return res.status(200).json({
            foodSpace: newFoodSpace
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
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
        // Delete FoodSpace
        const foodSpace = await FoodSpace.findByIdAndDelete(foodSpace_id)

        // Remove FoodSpace from Admin
        const user = await User.findByIdAndUpdate(_id, {
            "$pull": {
                "admin": {
                    "_id": foodSpace_id
                }
            }
        })

        for await (const user of foodSpace.users) {
            await User.findByIdAndUpdate(user._id, {
                "$pull": {
                    "foodSpaces": {
                        "_id": foodSpace_id
                    }
                }
            })
        }
        return res.status(200).json({
            message: `Removed FoodSpace: #${foodSpace_id}`
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}



// Access to Admin only
export const addUserToFoodSpace = async (req, res) => {
    console.log('ADDING NEW USER')
    // Validate if User is an Admin
    const { _id } = req.user
    const { email, foodSpace_id } = req.body

    if (!email.includes('@')) {
        return res.status(400).json({
            message: "Please provide a valid email address."
        })
    }
    const check = await checkIfInFoodSpace(foodSpace_id, _id)
    if (!check || check === "user") {
        return res.status(400).json({
            message: "Access Denied"
        })
    }



    try {
        const newUser = await User.findOne({ email: email })

        if (newUser) {
            const userExist = await checkIfInFoodSpace(foodSpace_id, newUser._id.toString())
            // Validation: User Exist
            if (userExist) {
                console.log('USER ALREADY EXIST')
                return res.status(400).json({
                    message: "User is already added."
                })
            }
            // Validation: Cannot Add yourself
            if (newUser._id === _id) {
                return res.status(400).json({
                    message: "Cannot add yourself."
                })
            }

            try {
                // Grabbing FoodSpace
                const foodSpace = await FoodSpace.findById(foodSpace_id)


                // Creating User Schema
                const newUserModel = {
                    _id: newUser._id,
                    first_name: newUser.first_name,
                    last_name: newUser.last_name,
                    email: newUser.email,
                    avatar: newUser.avatar
                }


                // Adding User to FoodSpace
                foodSpace.users.push(newUserModel)
                await foodSpace.save()

                // Adding FoodSpace to New User
                const foodSpaceModel = {
                    _id: foodSpace._id,
                    name: foodSpace.name,
                    expiredStock: foodSpace.expiredStock,
                    admin: foodSpace.admin,
                    users: foodSpace.users
                }

                newUser.foodSpaces.push(foodSpaceModel)
                await newUser.save()

                // Updating Admin Data
                const adminUser = await User.findById(_id)
                let adminFoodSpace = adminUser.admin.find((item) => item._id.toString() === foodSpace_id)
                adminFoodSpace.users.push(newUserModel)
                await adminUser.save()
                console.log('UPDATED ADMIN')

                // Updating Current Users Data
                for (const current of foodSpace.users) {
                    if (current._id.toString() !== newUser._id.toString()) {
                        const user = await User.findById(current._id)
                        let userFoodSpace = user.foodSpaces.find((item) => item._id.toString() === foodSpace_id)
                        userFoodSpace.users.push(newUserData)
                        await user.save()
                    }
                }


                return res.status(200).json({
                    message: `Added user to your FoodSpace: #${foodSpace_id}`,
                    foodSpace: foodSpace
                })


            } catch (error) {
                return res.status(400).json({
                    message: `Could not find the FoodSpace.`
                })
            }

        } else {
            return res.status(400).json({
                message: `${email} does not exist.`
            })
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({
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
        // const foodSpace = await FoodSpace.findById(foodSpace_id)
        // Remove User from FoodSpace
        const foodSpace = await FoodSpace.findByIdAndUpdate(foodSpace_id, {
            "$pull": {
                "users": {
                    "_id": user_id
                }
            }
        })

        // Remove Foodspace from User
        const user = await User.findByIdAndUpdate(user_id, {
            "$pull": {
                "foodSpaces": {
                    "_id": foodSpace_id
                }
            }
        })

        // Updating Admin's FoodSpace
        const admin = await User.findById(_id)
        let foodSpaceToUpdate = admin.admin.find((item) => item._id.toString() === foodSpace_id)
        const updatedUsers = foodSpaceToUpdate.users.filter((user) => user._id.toString() !== user_id)
        foodSpaceToUpdate.users = [...updatedUsers]
        await admin.save()


        // Updating Current Users In FoodSpace Data
        if (foodSpace.users.length > 0) {
            for (const current of foodSpace.users) {
                if (current._id.toString() !== user_id) {
                    const user = await User.findById(current._id)
                    let foodSpaceToUpdate = user.foodSpaces.find((item) => item._id.toString() === foodSpace_id)
                    console.log('BEFORE ', foodSpaceToUpdate)
                    const updatedUsers = foodSpaceToUpdate.users.filter((user) => user._id.toString() !== user_id)
                    foodSpaceToUpdate.users = [...updatedUsers]
                    console.log('After  ', foodSpaceToUpdate)
                    await user.save()
                }
            }
        }

        return res.status(200).json({
            message: `Removed user from your FoodSpace: #${foodSpace_id}`,
            foodSpace: foodSpace
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


// Access to Admin only
export const addAreaToFoodSpace = async (req, res) => {
    console.log('ADDING AREA')
    // Validate if User is an Admin
    const { _id } = req.user
    const { areas, foodSpace_id } = req.body
    const check = await checkIfInFoodSpace(foodSpace_id, _id)
    if (!check || check === "user") {
        return res.status(400).json({
            message: "Access Denied"
        })
    }


    try {
        const foodSpace = await FoodSpace.findById(foodSpace_id)
        foodSpace.areas.push(...areas)
        await foodSpace.save()
        return res.status(200).json({
            message: `Added area to your FoodSpace: #${foodSpace_id}`,
            foodSpace: foodSpace
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Access to Admin only
export const removeAreaFromFoodSpace = async (req, res) => {
    console.log('REMOVE AREA')
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
        const foodSpace = await FoodSpace.findByIdAndUpdate(foodSpace_id, {
            "$pull": {
                "areas": area
            }
        })
        return res.status(200).json({
            message: `Removed area from your FoodSpace: #${foodSpace_id}`,
            foodSpace: foodSpace
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Access to Admin and User 
export const addItemToFoodSpace = async (req, res) => {
    console.log("ADDING ITEM TO FOODSPACE")
    // Validate if User is an Admin or User
    const { _id } = req.user
    const { items, foodSpace_id } = req.body
    const check = await checkIfInFoodSpace(foodSpace_id, _id)
    if (!check) {
        return res.status(400).json({
            message: "Access Denied"
        })
    }



    try {
        const foodSpace = await FoodSpace.findById(foodSpace_id)



        if (foodSpace.areas.length === 0) {
            foodSpace.areas = ['default']
            await foodSpace.save()
        }

        items.forEach((item) => {
            if (!foodSpace.areas.includes(item.area)) {
                item.area = foodSpace.areas[0]
            }
            foodSpace.stock.push(item)
        })

        await foodSpace.save()
        return res.status(200).json({
            message: `Added item to FoodSpace: #${foodSpace_id}`,
            foodSpace: foodSpace
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Access to Admin and User 
export const removeItemFromFoodSpace = async (req, res) => {
    console.log('REMOVING ITEM')
    // Validate if User is an Admin or User
    const { _id } = req.user
    const { item_id, foodSpace_id } = req.body
    const check = await checkIfInFoodSpace(foodSpace_id, _id)
    if (!check) {
        return res.status(400).json({
            message: "Access Denied"
        })
    }

    try {
        const item = ((await FoodSpace.findById(foodSpace_id)).stock).find((item) => item._id.toString() === item_id)

        // Item does not Exist
        if (!item) {
            return res.status(400).json({
                message: "Item does not exist"
            })
        }

        // Only Owner and Admin access
        if (item.owner !== null && item.owner._id.toString() !== _id && check !== "admin") {
            return res.status(400).json({
                message: "Access Denied"
            })
        } else {
            const foodSpace = await FoodSpace.findByIdAndUpdate(foodSpace_id, {
                "$pull": {
                    "stock": {
                        "_id": item_id
                    }
                }
            })

            return res.status(200).json({
                message: `Removed item ${item_id} from your FoodSpace`,
                foodSpace
            })
        }


    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Access to Admin and User 
export const updateItemFromFoodSpace = async (req, res) => {
    console.log('UPDATING ITEM')
    // Validate if User is an Admin or User
    const { _id } = req.user
    const { item_id: id, foodSpace_id, info } = req.body
    const check = await checkIfInFoodSpace(foodSpace_id, _id)
    if (!check) {
        return res.status(400).json({
            message: "Access Denied"
        })
    }


    // Change Owner, Area and Quantity
    const { owner, area, quantity } = info

    try {
        const foodSpace = await FoodSpace.findById(foodSpace_id)

        // Grab Index
        const updateIndex = foodSpace.stock.findIndex((item) => (item._id).toString() === id)

        // Grab Item and Update
        let itemToUpdate = foodSpace.stock.find((item) => (item._id).toString() === id)

        // Item is owned by someone
        if (itemToUpdate.owner && check === "user") {
            // User must be the owner or Admin
            if (itemToUpdate.owner._id.toString() !== _id) {
                return res.status(400).json({
                    message: "Change Not Allowed."
                })
            }
        }

        if (owner) {
            itemToUpdate['owner'] = owner
        } else {
            itemToUpdate['owner'] = null
        }

        if (area) {
            itemToUpdate['area'] = area
        }

        if (quantity) {
            itemToUpdate['quantity'] = quantity
        }

        // Update FoodSpace
        foodSpace.stock[updateIndex] = itemToUpdate
        foodSpace.save()

        return res.status(200).json({
            message: `Updated your item in your FoodSpace`,
            foodSpace: foodSpace
        })



    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}







