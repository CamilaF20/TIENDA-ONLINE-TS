import express from "express";
import dotenv from "dotenv";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./drivers/connect-db";
import Client from "./models/Client";
import Order from "./models/Order";

import routeAuth from "./routes/routeAuth";
import routeClient from "./routes/routeClient";
import routeOrder from "./routes/routeOrder";
import routeProduct from "./routes/routeProduct";
import { swaggerDocs } from "./config/swagger";
import { viewAuth, requireRole } from "./middlewares/viewAuth";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout");

// Public routes and views
app.get("/", (req, res) => res.render("index", { title: "Inicio | Tienda Online" }));
app.get("/login", (req, res) => res.render("login", { title: "Iniciar sesión" }));
app.get("/register", (req, res) => res.render("register", { title: "Registrar usuario" }));

// views for clients and orders (no auth) - note: form actions use server endpoints below
app.get("/clients", async (req, res) => {
  try {
    const clients = await Client.find();
    res.render("clients/list", { title: "Clientes", clients });
  } catch (error: any) {
    res.status(500).send(`Error al cargar clientes: ${error.message}`);
  }
});

app.get("/clients/newClient", (req, res) => res.render("clients/new", { title: "Nuevo Cliente" }));

app.post("/clients", async (req, res) => {
  try {
    await Client.create(req.body);
    res.redirect("/clients");
  } catch (error: any) {
    res.status(500).send(`Error al crear cliente: ${error.message}`);
  }
});

app.get("/orders/:clientId", async (req, res) => {
  try {
    const client = await Client.findById(req.params.clientId);
    if (!client) return res.status(404).send("Cliente no encontrado");
    const orders = await Order.find({ client: client._id });
    res.render("orders/list", { title: "Pedidos", client, orders });
  } catch (error: any) {
    res.status(500).send(`Error al listar pedidos: ${error.message}`);
  }
});

app.get("/orders/newOrder/:clientId", async (req, res) => {
  try {
    const client = await Client.findById(req.params.clientId);
    if (!client) return res.status(404).send("Cliente no encontrado");
    res.render("orders/new", { title: "Nuevo Pedido", client });
  } catch (error: any) {
    res.status(500).send(`Error al cargar formulario: ${error.message}`);
  }
});

app.post("/orders/:clientId", async (req, res) => {
  try {
    const { clientId } = req.params;
    const { nombre, cantidad, precio } = req.body;
    const productos = Array.isArray(nombre)
      ? nombre.map((n: string, i: number) => ({ nombre: n, cantidad: parseInt(cantidad[i]), precio: parseFloat(precio[i]) }))
      : [{ nombre, cantidad: parseInt(cantidad), precio: parseFloat(precio) }];

    const total = productos.reduce((sum: number, p: any) => sum + p.cantidad * p.precio, 0);

    await Order.create({
      client: clientId,
      products: productos.map(p => ({ name: p.nombre, quantity: p.cantidad, price: p.precio })),
      total
    });

    res.redirect(`/orders/${clientId}`);
  } catch (error: any) {
    res.status(500).send(`Error al crear pedido: ${error.message}`);
  }
});

// Admin and client dashboards (protected views)
app.get("/admin", viewAuth, requireRole("admin"), (req, res) => {
  res.render("adminDashboard", { title: "Admin" });
});

app.get("/client", viewAuth, requireRole("client"), (req, res) => {
  res.render("clientDashboard", { title: "Client" });
});

// API routes (prefix /api)
app.use("/api/auth", routeAuth);
app.use("/api/clients", routeClient);
app.use("/api/orders", routeOrder);
app.use("/api/products", routeProduct);

swaggerDocs(app);

app.get("/ping", (req, res) => res.json({ msg: "API funcionando correctamente 🚀" }));

const PORT = process.env.PORT || 3330;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Swagger docs en http://localhost:${PORT}/api/docs`);
});

export default app;
