import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const COOKIE_NAME = process.env.COOKIE_NAME || "token";
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || "2h";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, rol } = req.body;
    const exist = await User.findOne({ email });
    if (exist) {
      res.status(400).json({ error: "El usuario ya está registrado" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, rol: rol || "client" });
    await newUser.save();
    res.status(201).json({ msg: "Usuario registrado correctamente", user: { name, email, rol: newUser.rol } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ error: "Contraseña incorrecta" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no está definido");
    }

    const payload = { 
      id: user._id.toString(), 
      email: user.email, 
      role: user.rol 
    };
    
    const secret: string = process.env.JWT_SECRET;
    // Simplemente pasa las opciones inline sin tipar
    const token: string = jwt.sign(payload, secret, { expiresIn: JWT_EXPIRES } as any);

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax" as const,
      maxAge: 7200000
    });
    
    res.json({ msg: "Inicio de sesión exitoso", token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie(COOKIE_NAME);
    res.json({ msg: "Sesión cerrada" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};