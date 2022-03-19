import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { genSalt, hash, compare } from 'bcrypt'
import dotenv from "dotenv"

dotenv.config()


export const register = async (req, res) => {
    console.log('REGISTER')
    try {
        // Get user input
        const { email, password, first_name, last_name } = req.body

        // Validate user input
        if (!email || !password || !first_name || !last_name) {
            res.status(400).send("All input is required");
        } else {
            const salt = await genSalt()
            const hashPassword = await hash(req.body.password, salt)

            const data = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: hashPassword,
                email: req.body.email.toLowerCase(),
            }
            const user = await User.create(data)

            res.status(200).json({ message: "Registered Successfully" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}

export const login = async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body

        // Validate user input
        if (!(email && password)) {
            res.status(400).json({
                message: "All input is required"
            })
        }

        let user;
        user = await User.findOne({ email: email })

        if (!user) {
            return res.status(401).send("Invalid Credentials")
        }


        let isMatch = await compare(password, user.password)
        if (!isMatch) {
            res.status(401).send({
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

            res.status(200).json({ token })
        }

    } catch (err) {
        console.error(err);
    }

}


export const me = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        res.json({
            me: user
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}


export const logout = async (req, res) => {
    res.cookie("accessToken", "", {
        maxAge: 0,
        httpOnly: true
    })

    return res.send({ success: true })
}


export const emailCheck = async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email: email })
        res.json({
            user
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
}





