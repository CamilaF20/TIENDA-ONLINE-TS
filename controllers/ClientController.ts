import { Request, Response } from "express";
import Client from "../models/Client";

export const addClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, address } = req.body;

    const exist = await Client.findOne({ email });
    if (exist) {
      res.status(400).json({ error: "Ya existe un cliente con ese correo" });
      return;
    }

    const newClient = new Client({ name, email, address });
    await newClient.save();

    res.status(201).json({ msg: "Cliente creado correctamente", client: newClient });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const clientList = async (req: Request, res: Response): Promise<void> => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) {
      res.status(404).json({ error: "Cliente no encontrado" });
      return;
    }
    res.json({ msg: "Cliente actualizado", client });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      res.status(404).json({ error: "Cliente no encontrado" });
      return;
    }
    res.json({ msg: "Cliente eliminado correctamente" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
