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

const dataAddressPlc = {
    button_1: 0,
    lamp_1: 3,
    button_2: 4,
    lamp_2: 7,
}

client.connectTCP(process.env.MODBUS_HOST,{port: process.env.MODBUS_PORT}, (err)=>{
    if(err){
        console.log("Cant Connect to plc",err);
        client.connectTCP(process.env.MODBUS_IP,{port: process.env.MODBUS_PORT, timeout:5000});
    } else {
        console.log("plc connected");
        app.get("/api/getallstatus", (req, res) => {  
            client.readHoldingRegisters(dataAddressPlc.button_1, 1, (err, data) => {
                if (err) {
                    console.log("Cant read", err);
                } else {
                    res.send(data);
                }
            })  
    });
    }
});


app.listen(process.env.APP_PORT, () => {
    console.log(`Server listening on port ${process.env.APP_PORT}`);
})






