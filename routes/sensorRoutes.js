import express from "express";
import { readSensor } from "../controllers/sensorController.js";

const router = express.Router();

router.get("/readSensor", readSensor);

export default router;