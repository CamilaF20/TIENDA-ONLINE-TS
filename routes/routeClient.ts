import express from "express";
import auth from "../middlewares/auth";
import { addClient, clientList, updateClient, deleteClient } from "../controllers/ClientController";

const router = express.Router();

router.post("/", auth, addClient);
router.get("/", auth, clientList);
router.put("/:id", auth, updateClient);
router.delete("/:id", auth, deleteClient);

export default router;
