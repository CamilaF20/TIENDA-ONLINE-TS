"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const connect_db_1 = __importDefault(require("./drivers/connect-db"));
const routeAuth_1 = __importDefault(require("./routes/routeAuth"));
const routeClient_1 = __importDefault(require("./routes/routeClient"));
const routeOrder_1 = __importDefault(require("./routes/routeOrder"));
const swagger_1 = require("./config/swagger");
const Order_1 = __importDefault(require("./models/Order"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Configuración de EJS
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "../views"));
app.use(express_ejs_layouts_1.default);
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); // para formularios
// Base de datos
(0, connect_db_1.default)();
// Rutas API
app.use("/api/auth", routeAuth_1.default);
app.use("/api/clients", routeClient_1.default);
app.use("/api/orders", routeOrder_1.default);
// Swagger
(0, swagger_1.swaggerDocs)(app);
// Rutas frontend (EJS)
app.get("/", (req, res) => res.render("index", { title: "Inicio | Tienda Online" }));
app.get("/login", (req, res) => res.render("login", { title: "Iniciar sesión" }));
app.get("/register", (req, res) => res.render("register", { title: "Registrar usuario" }));
app.get("/orders/:clientId", async (req, res) => {
    const orders = await Order_1.default.find({ client: req.params.clientId }).populate("client");
    res.render("orders", { title: "Mis pedidos", orders });
});
const PORT = process.env.PORT || 3330;
app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
    console.log(`📘 Swagger: http://localhost:${PORT}/api/docs`);
});
