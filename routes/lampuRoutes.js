import express from 'express';
import { createLampu, getAllLampu } from '../controllers/lampuController.js';

const router = express.Router();

router.post('/', createLampu);
router.get('/', getAllLampu);

export default router;
