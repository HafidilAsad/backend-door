import { Lampu } from '../models/index.js';

export const createLampu = async (req, res) => {
  try {
    const lampu = await Lampu.create(req.body);
    res.status(201).json(lampu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllLampu = async (req, res) => {
  try {
    const lampu = await Lampu.findAll();
    res.status(200).json(lampu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
