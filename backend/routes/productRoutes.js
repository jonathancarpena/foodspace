import { Router } from "express";
import {
    getAllProducts,
    getProductById,
    addProduct,
    removeProduct,
    updateProduct
} from "../controller/productController.js";
import auth from "../middleware/auth.js";


const router = Router();
//@desc     GET all products from db
//@route    GET /api/products
///@access  Public
router.get("/", getAllProducts)

//@desc     GET a product by id from db
//@route    GET /api/products/:id
///@access  Public
router.get("/:id", getProductById)


//@desc     POST a product to the db
//@route    POST /api/products/add
///@access  Authenticated
router.post("/add", auth, addProduct)


//@desc     POST a product to the db
//@route    POST /api/products/remove
///@access  Authenticated
router.delete("/remove", auth, removeProduct)


//@desc     PUT a product to the db
//@route    PUT /api/products/update/:id
///@access  Authenticated
router.put("/update", auth, updateProduct)


export default router;