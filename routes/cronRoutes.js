import express from 'express';
import { getCronTimes, updateCronTimes, addCronJob, deleteCronJob } from '../controllers/cronController.js';

const router = express.Router();

router.get('/cron-times', getCronTimes);
router.post('/update-cron-times', updateCronTimes);
router.post('/add-cron-job', addCronJob);
router.post('/delete-cron-job', deleteCronJob);

export default router;