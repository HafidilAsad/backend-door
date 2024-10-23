import express from "express";
import { readSensor } from "../controllers/sensorController.js";
import { getAllStatus, writeDataCoil } from "../controllers/sensorController.js";

const router = express.Router();

router.get("/readSensor", readSensor);
router.get("/getAllstatus", async (req, res) => {
    try {
        const dataResponse = await getAllStatus();
        res.status(200).json(dataResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/control/:button/:id", async (req, res) => {
    try {
        await writeDataCoil(dataAddressPlc[`button_${req.params.button}`], req.params.id);
        const dataResponse = await getAllStatus();
        res.status(200).json(dataResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;