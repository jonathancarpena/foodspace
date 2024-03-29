import { Router } from "express";
const router = Router();
import {
    register,
    login,
    logout,
    me,
    emailCheck,
    deleteMe
} from '../controller/userController.js';

import auth from '../middleware/auth.js'

//@desc     POST add user to db
//@route    POST /api/user/register
///@access  Public
router.post("/register", register)


//@desc     POST user login session created
//@route    POST /api/user/login
///@access  Public
router.post("/login", login)

//@desc     POST user login session created
//@route    POST /api/user/email
///@access  Public
router.post("/email", emailCheck)

//@desc     POST user login session created
//@route    POST /api/user/me
///@access  Authenticated
router.get("/me", auth, me)


//@desc     DELETE user login session deleted
//@route    DELETE /api/user/logout
///@access  Authenticated
router.delete("/logout", auth, logout)

//@desc     DELETE user from database
//@route    DELETE /api/user/delete
///@access  Authenticated
router.delete("/deleteMe", auth, deleteMe)


export default router;