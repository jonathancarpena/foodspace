import { Router } from "express";
import {
    getAllFoodSpaces,
    getFoodSpaceById,
    getAdminFoodSpaceById,
    createFoodSpace,
    deleteFoodSpace,
    addAreaToFoodSpace,
    addUserToFoodSpace,
    removeUserFromFoodSpace,
    addItemToFoodSpace,
    removeItemFromFoodSpace,
    updateItemFromFoodSpace
} from "../controller/foodSpaceController.js";
import auth from "../middleware/auth.js";


const router = Router();

//@desc     GET all the users foodSpaces from db
//@route    GET /api/foodSpace
///@access  Authenticated
router.get("/", auth, getAllFoodSpaces)

//@desc     GET user foodSpace from db
//@route    GET /api/foodSpace/:id
///@access  Authenticated
router.get("/:id", auth, getFoodSpaceById)

//@desc     GET user's admin pantries
//@route    GET /api/foodSpace/admin/:id
///@access  Authenticated
router.get("/admin/:id", auth, getAdminFoodSpaceById)


//@desc     POST adds a foodSpace to db
//@route    POST /api/foodSpace/create
///@access  Authenticated
router.post("/create", auth, createFoodSpace)

//@desc     DELETE removes a foodSpace from db
//@route    DELETE /api/foodSpace/delete/:id
///@access  Authenticated
router.delete("/delete", auth, deleteFoodSpace)


//@desc     PUT updates areas in foodSpace
//@route    PUT /api/foodSpace/add-area
///@access  Authenticated
router.put("/add-area", auth, addAreaToFoodSpace)


//@desc     POST adds user to foodSpace
//@route    POST /api/foodSpace/add-user
///@access  Authenticated
router.post("/add-user", auth, addUserToFoodSpace)


//@desc     POST removes user to foodSpace
//@route    POST /api/foodSpace/remove-user
///@access  Authenticated
router.delete("/remove-user", auth, removeUserFromFoodSpace)


//@desc     POST adds product to foodSpace
//@route    POST /api/foodSpace/add-item
///@access  Authenticated
router.post("/add-item", auth, addItemToFoodSpace)

//@desc     POST removes user to foodSpace
//@route    POST /api/foodSpace/remove-item
///@access  Authenticated
router.delete("/remove-item", auth, removeItemFromFoodSpace)

//@desc     PUT updates product in foodSpace
//@route    PUT /api/foodSpace/update-item
///@access  Authenticated
router.post("/update-item", auth, updateItemFromFoodSpace)


export default router;