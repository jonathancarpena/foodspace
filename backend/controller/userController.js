import User from '../models/User.js'
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
    if (userExist) {
        console.log("USER EXISTS")
        return res.status(200).json({
            ok: userExist ? true : false,
            user: userExist ? userExist : null
        })
    }


    return res.status(500).json({
        message: "Server Error"
    })

}





