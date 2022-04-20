import User from '../models/User.js'
import FoodSpace from '../models/FoodSpace.js'
import Product from '../models/Product.js'


import jwt from 'jsonwebtoken'
import { genSalt, hash, compare } from 'bcrypt'
import dotenv from "dotenv"

dotenv.config()


export const register = async (req, res) => {

    try {
        // Get user input
        const { email, password, first_name, last_name, avatar } = req.body


        // Validate user input
        if (!email || !password || !first_name || !last_name || !avatar) {
            return res.status(400).json({
                message: "All input is required"
            });
        } else {
            // Validate User exist already
            const userExist = await User.findOne({ email: email })
            if (userExist) {
                return res.status(400).json({
                    message: "Access Denied"
                });
            }

            let token
            const salt = await genSalt()
            const hashPassword = await hash(req.body.password, salt)

            const data = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: hashPassword,
                email: req.body.email.toLowerCase(),
                avatar: avatar
            }
            const user = await User.create(data)

            if (user) {
                token = jwt.sign({
                    _id: user._id,
                    email: user.email
                }, process.env.TOKEN_KEY, {
                    expiresIn: 360000
                })
            }
            return res.status(200).json({
                token,
                user
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

export const login = async (req, res) => {
    console.log('LOGIN EVENT')
    try {
        // Get user input
        const { email, password } = req.body


        // Validate user input
        if (!(email && password)) {
            return res.status(400).json({
                message: "All input is required"
            })
        }

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }


        const isMatch = await compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect Password"
            })
        }


        if (isMatch && user) {
            const token = jwt.sign({
                _id: user._id,
                email: user.email
            }, process.env.TOKEN_KEY, {
                expiresIn: 360000
            })

            return res.status(200).json({ token, user })
        }

    } catch (err) {
        console.error(err);
    }

}


export const me = async (req, res) => {
    console.log('FETCHING ME')
    try {
        const user = await User.findById(req.user._id)
        return res.status(200).json({
            user
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


export const logout = async (req, res) => {
    res.cookie("accessToken", "", {
        maxAge: 0,
        httpOnly: true
    })

    return res.json({ message: "success" })
}


export const emailCheck = async (req, res) => {
    console.log('CHECKING EMAIL')
    const { email } = req.body

    const userExist = await User.findOne({ email: email })

    return res.status(200).json({
        ok: userExist ? true : false,
        user: userExist ? userExist : null
    })

}

export const deleteMe = async (req, res) => {
    console.log('DELETING ACCOUNT')
    const { _id } = req.user

    const user = await User.findById(_id)
    if (!user) {
        return res.status(400).json({
            message: "User does not exist."
        })
    }

    // Remove all Users in their Admin FoodSpaces
    try {

        // Iterating through all Admin FoodSpaces
        for (const adminFoodSpace of user.admin) {

            // Grabbing FoodSpace ID
            const foodSpace_id = adminFoodSpace._id

            // Iterating through all the users in the FoodSpace
            for (const userToDelete of adminFoodSpace.users) {

                // Removing the FoodSpace from the User
                const user = await User.findByIdAndUpdate(userToDelete._id, {
                    "$pull": {
                        "foodSpaces": {
                            "_id": foodSpace_id
                        }
                    }
                })
            }

            // Delete FoodSpace
            const deleteFoodSpace = await FoodSpace.findByIdAndDelete(foodSpace_id)
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }

    // Remove from any FoodSpace they are in
    try {
        // Iterating through all Users FoodSpaces
        for (const currentFoodSpace of user.foodSpaces) {

            // Grabbing FoodSpace ID
            const foodSpace_id = currentFoodSpace._id

            // Iterating through all the users in the FoodSpace
            for (const user of currentFoodSpace.users) {

                // Updating Current Users In FoodSpace Data
                if (user._id.toString() !== _id) {
                    const user = await User.findById(user._id)
                    let foodSpaceToUpdate = user.foodSpaces.find((item) => item._id.toString() === foodSpace_id)
                    const updatedUsers = foodSpaceToUpdate.users.filter((user) => user._id.toString() !== _id)
                    foodSpaceToUpdate.users = [...updatedUsers]
                    await user.save()
                }

            }

            // Remove User from the FoodSpace
            const foodSpace = await FoodSpace.findByIdAndUpdate(foodSpace_id, {
                "$pull": {
                    "users": {
                        "_id": user_id
                    }
                }
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }


    // Update My Products to Default FoodSpace User
    try {

        const users = await User.find({})
        const defaultUser = users[0]

        // Iterating through all Users Products
        for (const product of user.myProducts) {

            // Grabbing Product ID
            const product_id = product._id

            const updatedInfo = {
                author: {
                    _id: defaultUser._id,
                    first_name: defaultUser.first_name,
                    last_name: defaultUser.last_name,
                    email: defaultUser.email,
                    avatar: defaultUser.avatar
                }
            }

            // Updating Product
            const updatedProduct = await Product.findByIdAndUpdate(product_id, updatedInfo)
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }

    // Delete User
    const deleteUserPermanently = await User.findByIdAndDelete(_id)
    if (deleteUserPermanently) {
        return res.status(200).json({
            message: "User has been deleted."
        })
    }

}





