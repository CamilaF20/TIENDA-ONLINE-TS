"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.listProducts = exports.addProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const addProduct = async (req, res) => {
    try {
        const { name, price, stock } = req.body;
        const exist = await Product_1.default.findOne({ name });
        if (exist) {
            res.status(400).json({ error: "El producto ya existe" });
            return;
        }
        const newProduct = new Product_1.default({ name, price, stock });
        await newProduct.save();
        res.status(201).json({ msg: "✅ Producto creado correctamente", product: newProduct });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.addProduct = addProduct;
const listProducts = async (req, res) => {
    try {
        const products = await Product_1.default.find();
        if (!products.length) {
            res.status(404).json({ msg: "No hay productos registrados" });
            return;
        }
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.listProducts = listProducts;
const updateProduct = async (req, res) => {
    try {
        const product = await Product_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            res.status(404).json({ error: "Producto no encontrado" });
            return;
        }
        res.json({ msg: "✅ Producto actualizado", product });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const product = await Product_1.default.findByIdAndDelete(req.params.id);
        if (!product) {
            res.status(404).json({ error: "Producto no encontrado" });
            return;
        }
        res.json({ msg: "🗑️ Producto eliminado correctamente" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteProduct = deleteProduct;
