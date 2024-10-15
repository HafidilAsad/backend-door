import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sensorRoutes from "./routes/sensorRoutes.js";
import Stream from "node-rtsp-stream";

dotenv.config();

const app = express();
const stream = new Stream({
    name: 'name',
    streamUrl: 'rtsp://admin:Komponen1@192.168.1.22:5543/051c6519288cc2d8b07f026902be8c96/live/channel0',
    wsPort: 9999,
    ffmpegOptions: { // options to pass to ffmpeg
        '-stats': '',
        '-r': 30,
    },
})



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






