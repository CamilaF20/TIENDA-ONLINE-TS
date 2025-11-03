"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listOrderClient = exports.addOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const Client_1 = __importDefault(require("../models/Client"));
const Product_1 = __importDefault(require("../models/Product"));
/**
 * 🛒 Crear un nuevo pedido
 *
 * Body esperado:
 * {
 *   "clientId": "64adf6a1234567890abc1234",
 *   "products": [
 *      { "productId": "64adf6a1234567890abc5678", "quantity": 2 }
 *   ]
 * }
 */
const addOrder = async (req, res) => {
    try {
        const { clientId, products } = req.body;
        // Validar cliente
        const client = await Client_1.default.findById(clientId);
        if (!client) {
            res.status(404).json({ error: "Cliente no encontrado" });
            return;
        }
        // Validar productos
        if (!products || !Array.isArray(products) || products.length === 0) {
            res.status(400).json({ error: "Debe incluir al menos un producto" });
            return;
        }
        // Verificar que los productos existan
        const productIds = products.map((p) => p.productId);
        const foundProducts = await Product_1.default.find({ _id: { $in: productIds } });
        if (foundProducts.length !== products.length) {
            res.status(400).json({ error: "Uno o más productos no existen" });
            return;
        }
        // Calcular total
        const orderProducts = products.map((p) => {
            const prod = foundProducts.find(fp => fp.id.toString() === p.productId);
            return {
                product: prod._id,
                quantity: p.quantity,
                price: prod.price
            };
        });
        const total = orderProducts.reduce((sum, p) => sum + p.quantity * p.price, 0);
        // Crear la orden
        const order = new Order_1.default({
            client: clientId,
            products: orderProducts,
            total
        });
        await order.save();
        res.status(201).json({
            msg: "Pedido creado exitosamente",
            client: {
                id: client._id,
                name: client.name,
                email: client.email
            },
            products: orderProducts.map(p => ({
                productId: p.product,
                quantity: p.quantity,
                price: p.price
            })),
            total,
            createdAt: order.createdAt
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.addOrder = addOrder;
/**
 * 📦 Listar pedidos de un cliente
 */
const listOrderClient = async (req, res) => {
    try {
        const clientId = req.params.clientId;
        const orders = await Order_1.default.find({ client: clientId })
            .populate("client", "name email")
            .populate("products.product", "name price");
        if (!orders.length) {
            res.status(404).json({ msg: "Este cliente no tiene pedidos registrados." });
            return;
        }
        const formattedOrders = orders.map(order => ({
            id: order._id,
            client: order.client,
            products: order.products.map(p => ({
                id: p.product._id,
                name: p.product.name,
                price: p.product.price,
                quantity: p.quantity
            })),
            total: order.total,
            createdAt: order.createdAt
        }));
        res.json(formattedOrders);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.listOrderClient = listOrderClient;
