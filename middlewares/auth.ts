import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  email?: string;
  iat?: number;
  exp?: number;
}

const auth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.header("Authorization");
  const cookieToken = (req.cookies && req.cookies[process.env.COOKIE_NAME || "token"]) as string | undefined;
  let token = cookieToken ?? null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.replace("Bearer ", "");
  }

  if (!token) {
    res.status(401).json({ error: "Acceso denegado. Token requerido" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};

export default auth;
