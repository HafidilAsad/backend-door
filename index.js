import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sensorRoutes from "./routes/sensorRoutes.js";
import visitorRoute from "./routes/visitorRoute.js";
import bodyParser from "body-parser";
import sessiionMiddleware from "./midleware/sessionMiddlewere.js";
import {log, errorLogger} from "./utils/logger.js";
import lampuRoutes from "./routes/lampuRoutes.js";
import jadwalLampuRoutes from "./routes/jadwalLampuRoutes.js";
import energyRoutes from "./routes/energyRoutes.js";
import cron from "node-cron";
import axios from 'axios';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

// allow cors origin *

app.get("/api/test", (req, res) => {
    res.send("SERVER UP!");
});



app.use('/api/lampu', lampuRoutes);
app.use('/api/jadwalLampu', jadwalLampuRoutes);
app.use('/api', energyRoutes);


app.use("/api", sensorRoutes);
app.use("/api", visitorRoute);

// Middleware
app.use(bodyParser.json());
app.use(sessiionMiddleware);


// for cron job
cron.schedule("00 07 * * *", async () => {
    try {
          await axios.post(`https://solusiprogrammer.com/api/control/button_1/1`);
          await axios.post(`https://solusiprogrammer.com/api/control/button_2/1`);
          await axios.post(`https://solusiprogrammer.com/api/control/button_3/1`);
          await axios.post(`https://solusiprogrammer.com/api/control/button_4/1`);
        log(`running turn on lampu `);
    } catch (error) {
        errorLogger(`failed turn on lampu , ${error}` );
    }
});


cron.schedule("00 19 * * *", async () => {
    try {
        await axios.post(`https://solusiprogrammer.com/api/control/button_1/0`);
        await axios.post(`https://solusiprogrammer.com/api/control/button_2/0`);
        await axios.post(`https://solusiprogrammer.com/api/control/button_3/0`);
        await axios.post(`https://solusiprogrammer.com/api/control/button_4/0`);
        log(`running turn off lampu `);
    } catch (error) {
        errorLogger(`failed turn off lampu , ${error}` ); ;
    }
});

cron.schedule("30 20 18 * * *", async () => {
    try {
        const response = await axios.get('https://solusiprogrammer.com/api/getallstatus');
        const { kwh, suhu: temperature, kelembaban: humidity } = response.data;

        await axios.post('https://solusiprogrammer.com/api/energy', {
            kwh,
            humidity,
            temperature
        });

        log(`Energy data posted successfully`);
    } catch (error) {
        errorLogger(`Failed to post energy data, ${error}`);
    }
});

app.listen(process.env.APP_PORT, () => {
    log(`Server listening on port ${process.env.APP_PORT}`);
})

