import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sensorRoutes from "./routes/sensorRoutes.js";
import Modbus from "modbus-serial";

dotenv.config();

const app = express();

const client = new Modbus();


app.use(cors());
app.use(express.json());

// allow cors origin *

app.get("/api/test", (req, res) => {
    res.send("SERVER UP!");
});

app.use("/api", sensorRoutes);



app.listen(process.env.APP_PORT, () => {
    console.log(`Server listening on port ${process.env.APP_PORT}`);
})






