"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exist = await User_1.default.findOne({ email });
        if (exist) {
            res.status(400).json({ error: "El usuario ya está registrado" });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new User_1.default({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ msg: "✅ Usuario registrado correctamente", user: { name, email } });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ error: "Usuario no encontrado" });
            return;
        }
        const passwordValida = await bcryptjs_1.default.compare(password, user.password);
        if (!passwordValida) {
            res.status(401).json({ error: "Contraseña incorrecta" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "2h" });
        res.json({ msg: "✅ Inicio de sesión exitoso", token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.login = login;
const getUsers = async (req, res) => {
    try {
        const users = await User_1.default.find({}, "-password");
        if (!users.length) {
            res.status(404).json({ msg: "No hay usuarios registrados" });
            return;
        }
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getUsers = getUsers;
