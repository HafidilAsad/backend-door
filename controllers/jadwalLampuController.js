import { JadwalLampu } from '../models/index.js';

export const createJadwalLampu = async (req, res) => {
  try {
    const jadwalLampu = await JadwalLampu.create(req.body);
    res.status(201).json(jadwalLampu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllJadwalLampu = async (req, res) => {
  try {
    const jadwalLampu = await JadwalLampu.findAll();
    res.status(200).json(jadwalLampu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
