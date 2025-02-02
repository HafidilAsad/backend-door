import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sensorRoutes from "./routes/sensorRoutes.js";
import Modbus from "modbus-serial";
import bodyParser from "body-parser";
import sessiionMiddleware from "./midleware/sessionMiddlewere.js";
import visitorRoute from "./routes/visitorRoute.js";
import {log, errorLogger} from "./utils/logger.js";
import lampuRoutes from "./routes/lampuRoutes.js";
import jadwalLampuRoutes from "./routes/jadwalLampuRoutes.js";

dotenv.config();

const app = express();

const client = new Modbus();


app.use(cors());
app.use(express.json());

// allow cors origin *

app.get("/api/test", (req, res) => {
    res.send("SERVER UP!");
});

app.use('/api/lampu', lampuRoutes);
app.use('/api/jadwalLampu', jadwalLampuRoutes);


app.use("/api", sensorRoutes);
app.use("/api", visitorRoute);

// Middleware
app.use(bodyParser.json());
app.use(sessiionMiddleware);




app.listen(process.env.APP_PORT, () => {
    log(`Server listening on port ${process.env.APP_PORT}`);
})

