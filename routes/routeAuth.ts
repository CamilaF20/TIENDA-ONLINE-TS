import express from "express";
import { register, login, logout, getUsers } from "../controllers/AuthController";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/users", auth, getUsers);

export default router;
