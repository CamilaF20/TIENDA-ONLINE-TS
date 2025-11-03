"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderController_1 = require("../controllers/OrderController");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints para la gestión de pedidos
 */
/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crear un nuevo pedido
 *     description: Crea un pedido asociado a un cliente y varios productos existentes. Requiere autenticación con JWT.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientId
 *               - products
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: ID del cliente que realiza el pedido
 *                 example: "674c9f1285a0497cfbb1a73e"
 *               products:
 *                 type: array
 *                 description: Lista de productos incluidos en el pedido
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: string
 *                       description: ID del producto existente
 *                       example: "674c9f38f2a1b4976a8b0b6d"
 *                     quantity:
 *                       type: number
 *                       description: Cantidad de unidades solicitadas
 *                       example: 2
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: ✅ Pedido creado exitosamente
 *                 order:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 674ca5d0f2a1b4976a8b0e21
 *                     client:
 *                       type: string
 *                       example: 674c9f1285a0497cfbb1a73e
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: string
 *                             example: 674c9f38f2a1b4976a8b0b6d
 *                           quantity:
 *                             type: number
 *                             example: 2
 *                           price:
 *                             type: number
 *                             example: 45000
 *                     total:
 *                       type: number
 *                       example: 90000
 *       400:
 *         description: Datos del pedido inválidos
 *       401:
 *         description: Token no válido o ausente
 *       404:
 *         description: Cliente o producto no encontrado
 */
router.post("/", auth_1.default, OrderController_1.addOrder);
/**
 * @swagger
 * /orders/{clientId}:
 *   get:
 *     summary: Listar pedidos de un cliente
 *     description: Retorna todos los pedidos asociados a un cliente específico.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente cuyos pedidos se desean obtener
 *     responses:
 *       200:
 *         description: Lista de pedidos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 674ca5d0f2a1b4976a8b0e21
 *                   client:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 674c9f1285a0497cfbb1a73e
 *                       name:
 *                         type: string
 *                         example: Camila Figueredo
 *                       email:
 *                         type: string
 *                         example: camila@example.com
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         product:
 *                           type: string
 *                           example: 674c9f38f2a1b4976a8b0b6d
 *                         quantity:
 *                           type: number
 *                           example: 2
 *                         price:
 *                           type: number
 *                           example: 45000
 *                   total:
 *                     type: number
 *                     example: 90000
 *                   createdAt:
 *                     type: string
 *                     example: 2025-11-02T22:00:00.000Z
 *       404:
 *         description: No se encontraron pedidos para el cliente
 *       401:
 *         description: Token no válido o ausente
 */
router.get("/:clientId", auth_1.default, OrderController_1.listOrderClient);
exports.default = router;
