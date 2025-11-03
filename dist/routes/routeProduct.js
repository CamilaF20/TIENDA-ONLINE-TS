"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const ProductController_1 = require("../controllers/ProductController");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gestión de productos de la tienda
 */
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price, stock]
 *             properties:
 *               name: { type: string, example: Camiseta }
 *               price: { type: number, example: 45000 }
 *               stock: { type: number, example: 10 }
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 */
router.post("/", auth_1.default, ProductController_1.addProduct);
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Listar todos los productos
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get("/", auth_1.default, ProductController_1.listProducts);
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name: { type: string, example: Zapatos }
 *               price: { type: number, example: 89000 }
 *               stock: { type: number, example: 20 }
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 */
router.put("/:id", auth_1.default, ProductController_1.updateProduct);
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 */
router.delete("/:id", auth_1.default, ProductController_1.deleteProduct);
exports.default = router;
