import { Request, Response } from "express";
import Order from "../models/Order";
import Client from "../models/Client";
import Product from "../models/Product";

/**
 * API: addOrder expects { clientId, products: [{ productId, quantity }] }
 */
export const addOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { clientId, products } = req.body;

    const client = await Client.findById(clientId);
    if (!client) {
      res.status(404).json({ error: "Cliente no encontrado" });
      return;
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
      res.status(400).json({ error: "Debe incluir al menos un producto" });
      return;
    }

    const productIds = products.map((p: any) => p.productId);
    const foundProducts = await Product.find({ _id: { $in: productIds } });

    if (foundProducts.length !== products.length) {
      res.status(400).json({ error: "Uno o más productos no existen" });
      return;
    }

    const orderProducts = products.map((p: any) => {
      const prod = foundProducts.find(fp => fp.id.toString() === p.productId);
      return {
        product: prod!._id,
        quantity: p.quantity,
        price: prod!.price
      };
    });

    const total = orderProducts.reduce((sum, p) => sum + p.quantity * p.price, 0);

    const order = new Order({
      client: clientId,
      products: orderProducts,
      total
    });

    await order.save();

    res.status(201).json({
      msg: "Pedido creado exitosamente",
      client: { id: client._id, name: client.name, email: client.email },
      products: orderProducts.map(p => ({ productId: p.product, quantity: p.quantity, price: p.price })),
      total,
      createdAt: order.createdAt
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const listOrderClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const clientId = req.params.clientId;
    const orders = await Order.find({ client: clientId })
      .populate("client", "name email")
      .populate("products.product", "name price");

    res.json(orders.map(order => ({
      id: order._id,
      client: order.client,
      products: order.products.map(p => ({
        id: (p.product as any)?._id || null,
        name: (p.product as any)?.name || p.name,
        price: (p.product as any)?.price || p.price,
        quantity: p.quantity
      })),
      total: order.total,
      createdAt: order.createdAt
    })));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
