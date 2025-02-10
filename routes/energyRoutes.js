// filepath: /d:/app/door-support/src/routes/energyRoutes.js
import express from 'express';
import {
  createEnergy,
  getEnergies,
  getEnergyById,
  updateEnergy,
  deleteEnergy
} from '../controllers/energyController.js';

const router = express.Router();

router.post('/energy', createEnergy);
router.get('/energy', getEnergies);
router.get('/energy/:id', getEnergyById);
router.put('/energy/:id', updateEnergy);
router.delete('/energy/:id', deleteEnergy);

export default router;