import { Router } from "express";
import {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
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
//@route    POST /api/products/create
///@access  Authenticated
router.post("/create", auth, createProduct)


//@desc     POST a product to the db
//@route    POST /api/products/delete
///@access  Authenticated
router.delete("/delete", auth, deleteProduct)


//@desc     PUT a product to the db
//@route    PUT /api/products/update
///@access  Authenticated
router.put("/update", auth, updateProduct)


export default router;