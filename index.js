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
    button_door_1: 8,
    status_door_1: 11,
    button_door_2: 12,
    status_door_2: 15,
    suhu: 0,
    kelembaban: 1,
    voltage: 2,
    arus: 3,
    kwh: 4
}

async function getAllStatus(){
    try {
        const button1Response = await client.readCoils(dataAddressPlc.button_1, 1);
        const button_1 = button1Response.data[0]  ? 1 : 0;
        const lamp1Response = await client.readCoils(dataAddressPlc.lamp_1, 1);
        const lamp_1 = lamp1Response.data[0] ? 1 : 0;
        const button2Response = await client.readCoils(dataAddressPlc.button_2, 1);
        const button_2 = button2Response.data[0] ? 1 : 0;
        const lamp2Response = await client.readCoils(dataAddressPlc.lamp_2, 1);
        const lamp_2 = lamp2Response.data[0] ? 1 : 0;
        const buttonDoor1Response = await client.readCoils(dataAddressPlc.button_door_1, 1);
        const button_door_1 = buttonDoor1Response.data[0] ? 1 : 0;
        const statusDoor1Response = await client.readCoils(dataAddressPlc.status_door_1, 1);
        const status_door_1 = statusDoor1Response.data[0] ? 1 : 0;
        const buttonDoor2Response = await client.readCoils(dataAddressPlc.button_door_2, 1);
        const button_door_2 = buttonDoor2Response.data[0] ? 1 : 0;
        const statusDoor2Response = await client.readCoils(dataAddressPlc.status_door_2, 1);
        const status_door_2 = statusDoor2Response.data[0] ? 1 : 0;
        const suhuResponse = await client.readHoldingRegisters(dataAddressPlc.suhu, 1);
        const suhu = suhuResponse.data[0];
        const kelembabanResponse = await client.readHoldingRegisters(dataAddressPlc.kelembaban, 1);
        const kelembaban = kelembabanResponse.data[0];
        const voltageResponse = await client.readHoldingRegisters(dataAddressPlc.voltage, 1);
        const voltage = voltageResponse.data[0];
        const arusResponse = await client.readHoldingRegisters(dataAddressPlc.arus, 1);
        const arus = arusResponse.data[0];
        const kwhResponse = await client.readHoldingRegisters(dataAddressPlc.kwh, 1);
        const kwh = kwhResponse.data[0];

        return {button_1, lamp_1, button_2, lamp_2, button_door_1, status_door_1, button_door_2, status_door_2, suhu, kelembaban, voltage, arus, kwh};
           
    } catch (error) {
        console.log(error);
        
    }
}

client.connectTCP(process.env.MODBUS_HOST,{port: process.env.MODBUS_PORT}, (err)=>{
    if(err){
        console.log("Cant Connect to plc",err);
        client.connectTCP(process.env.MODBUS_IP,{port: process.env.MODBUS_PORT, timeout:5000});
    } else {
        console.log("plc connected");
        app.get("/api/getAllstatus", async (req, res) => {
            try {
                const dataResponse = await getAllStatus();
                res.status(200).json(dataResponse);
                
            } catch (error) {
                res.status(500).json({ error: error.message });
                
            }
        })
    }
});


app.listen(process.env.APP_PORT, () => {
    console.log(`Server listening on port ${process.env.APP_PORT}`);
})






