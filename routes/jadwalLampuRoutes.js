import express from 'express';
import { createJadwalLampu, getAllJadwalLampu } from '../controllers/jadwalLampuController.js';

const router = express.Router();

router.post('/', createJadwalLampu);
router.get('/', getAllJadwalLampu);

export default router;
