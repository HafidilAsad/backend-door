
import { Energy } from '../models/index.js';
import { Op } from 'sequelize';

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
    const { status, start_date, end_date } = req.query;

    if (status === 'terbaru') {
      const latestEnergy = await Energy.findOne({
        order: [['createdAt', 'DESC']]
      });
      if (latestEnergy) {
        return res.status(200).json(latestEnergy);
      } else {
        return res.status(404).json({ error: 'No energy data found' });
      }
    } else {
      const startDate = start_date ? new Date(start_date) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const endDate = end_date ? new Date(end_date) : new Date();

      const energies = await Energy.findAll({
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate]
          }
        }
      });
      res.status(200).json(energies);
    }
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