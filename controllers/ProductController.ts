import { Request, Response } from "express";
import Product from "../models/Product";

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price, stock, description } = req.body;

    const exist = await Product.findOne({ name });
    if (exist) {
      res.status(400).json({ error: "El producto ya existe" });
      return;
    }

    const newProduct = new Product({ name, price, stock, description });
    await newProduct.save();

    res.status(201).json({ msg: "Producto creado correctamente", product: newProduct });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const listProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }
    res.json({ msg: "Producto actualizado", product });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }
    res.json({ msg: "Producto eliminado correctamente" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
