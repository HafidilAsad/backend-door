import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sensorRoutes from "./routes/sensorRoutes.js";
import Modbus from "modbus-serial";
import bodyParser from "body-parser";
import sessiionMiddleware from "./midleware/sessionMiddlewere.js";
import VisitorController from "./controllers/visitorController.js";
import sequelize from "./config/sequelize.js";

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
// Middleware
app.use(bodyParser.json());
app.use(sessiionMiddleware);

// Sync database and start server
sequelize
  .sync({ alter: true }) // Avoid in production; use migrations instead
  .then(() => console.log("Database synced"))
  .catch((error) => console.error("Database sync error:", error));



app.listen(process.env.APP_PORT, () => {
    console.log(`Server listening on port ${process.env.APP_PORT}`);
})






