import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const viewAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.[process.env.COOKIE_NAME || "token"];
    if (!token) {
      return res.redirect("/login");
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    res.locals.user = payload;
    next();
  } catch {
    return res.redirect("/login");
  }
};

export const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.[process.env.COOKIE_NAME || "token"];
    if (!token) return res.redirect("/login");
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
      if (payload && payload.role === role) {
        res.locals.user = payload;
        return next();
      }
      return res.status(403).send("Acceso no autorizado");
    } catch {
      return res.redirect("/login");
    }
  };
};
