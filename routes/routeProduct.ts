import express from "express";
import auth from "../middlewares/auth";
import { addProduct, listProducts, updateProduct, deleteProduct } from "../controllers/ProductController";

const router = express.Router();

router.post("/", auth, addProduct);
router.get("/", auth, listProducts);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

export default router;
