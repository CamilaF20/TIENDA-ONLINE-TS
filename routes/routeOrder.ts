import express from "express";
import auth from "../middlewares/auth";
import { addOrder, listOrderClient } from "../controllers/OrderController";

const router = express.Router();

router.post("/", auth, addOrder);
router.get("/:clientId", auth, listOrderClient);

export default router;
