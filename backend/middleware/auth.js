// import User from "../models/User"
import dotenv from "dotenv"
import jwt from 'jsonwebtoken'
dotenv.config()

const auth = async (req, res, next) => {
    let token = null
    const authHeader = req.headers.authorization
    if (authHeader) {
        token = authHeader.split(' ')[1]
    } else {
        return res.status(400).json({
            message: "No token found"
        })
    }

    try {
        let user = jwt.verify(token, process.env.TOKEN_KEY)
        req.user = user
        next()
    } catch (error) {
        return res.status(400).json({
            message: "Token invalid"
        })
    }


}

export default auth