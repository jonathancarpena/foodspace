import { Router } from "express";
const router = Router();
import {
    register,
    login,
    logout,
    me
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
//@route    POST /api/user/me
///@access  Authenticated
router.post("/me", auth, me)


//@desc     DELETE user login session deleted
//@route    DELETE /api/user/logout
///@access  Authenticated
router.delete("/logout", auth, logout)


export default router;