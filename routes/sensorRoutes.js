import express from "express";
import { readSensor } from "../controllers/sensorController.js";
import { getAllStatus, writeDataCoil } from "../controllers/sensorController.js";
import { dataAddressPlc } from "../controllers/constant.js";

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

router.post("/control/:button/:value", async (req, res) => {
    try {
        let valueData = parseInt(req.params.value);

        await writeDataCoil(dataAddressPlc[`${req.params.button}`], valueData);
        const dataResponse = await getAllStatus();
        console.log("dikontrol");
        res.status(200).json(dataResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;