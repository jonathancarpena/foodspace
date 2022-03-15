import dotenv from "dotenv"
import { genSalt, hash } from 'bcrypt'

dotenv.config()

export const generateHashPassword = async (password) => {
    const salt = await genSalt()
    const hashPassword = await hash(password, salt)
    return hashPassword
}

export const userData = {
    first_name: "jack",
    last_name: "mister",
    username: "misterjack",
    email: "misterjack@email.com",
}



