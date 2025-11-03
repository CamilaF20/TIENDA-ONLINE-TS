"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.clientList = exports.addClient = void 0;
const Client_1 = __importDefault(require("../models/Client"));
const addClient = async (req, res) => {
    try {
        const { name, email, address } = req.body;
        const exist = await Client_1.default.findOne({ email });
        if (exist) {
            res.status(400).json({ error: "Ya existe un cliente con ese correo" });
            return;
        }
        const newClient = new Client_1.default({ name, email, address });
        await newClient.save();
        res.status(201).json({ msg: "✅ Cliente creado correctamente", client: newClient });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.addClient = addClient;
const clientList = async (req, res) => {
    try {
        const clients = await Client_1.default.find();
        if (!clients.length) {
            res.status(404).json({ msg: "No hay clientes registrados" });
            return;
        }
        res.json(clients);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.clientList = clientList;
const updateClient = async (req, res) => {
    try {
        const client = await Client_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!client) {
            res.status(404).json({ error: "Cliente no encontrado" });
            return;
        }
        res.json({ msg: "✅ Cliente actualizado", client });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateClient = updateClient;
const deleteClient = async (req, res) => {
    try {
        const client = await Client_1.default.findByIdAndDelete(req.params.id);
        if (!client) {
            res.status(404).json({ error: "Cliente no encontrado" });
            return;
        }
        res.json({ msg: "🗑️ Cliente eliminado correctamente" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteClient = deleteClient;
