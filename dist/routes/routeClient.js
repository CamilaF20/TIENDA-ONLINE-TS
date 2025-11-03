"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const ClientController_1 = require("../controllers/ClientController");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Gestión de clientes
 */
/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, address]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 example: juan@example.com
 *               address:
 *                 type: string
 *                 example: Calle 123 #45-67
 *     responses:
 *       201:
 *         description: Cliente creado correctamente
 */
router.post("/", auth_1.default, ClientController_1.addClient);
/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Listar todos los clientes
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
router.get("/", auth_1.default, ClientController_1.clientList);
/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Actualiza un cliente existente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: María Gómez
 *               email:
 *                 type: string
 *                 example: maria@example.com
 *               address:
 *                 type: string
 *                 example: "Carrera 45 #12-34"
 *     responses:
 *       200:
 *         description: Cliente actualizado correctamente
 */
router.put("/:id", auth_1.default, ClientController_1.updateClient);
/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Eliminar un cliente
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Cliente eliminado correctamente
 */
router.delete("/:id", auth_1.default, ClientController_1.deleteClient);
exports.default = router;
