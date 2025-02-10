
import { Energy } from '../models/index.js';

export const createEnergy = async (req, res) => {
  try {
    const energy = await Energy.create(req.body);
    res.status(201).json(energy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEnergies = async (req, res) => {
  try {
    const energies = await Energy.findAll();
    res.status(200).json(energies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEnergyById = async (req, res) => {
  try {
    const energy = await Energy.findByPk(req.params.id);
    if (energy) {
      res.status(200).json(energy);
    } else {
      res.status(404).json({ error: 'Energy not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEnergy = async (req, res) => {
  try {
    const [updated] = await Energy.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedEnergy = await Energy.findByPk(req.params.id);
      res.status(200).json(updatedEnergy);
    } else {
      res.status(404).json({ error: 'Energy not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEnergy = async (req, res) => {
  try {
    const deleted = await Energy.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Energy not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};