import Modbus from "modbus-serial";
import { dataAddressPlc } from "../controllers/constant.js";
import dotenv from "dotenv";

const client = new Modbus();
dotenv.config();


client.connectTCP(process.env.MODBUS_HOST, { port: process.env.MODBUS_PORT }, (err) => {
    if (err) {
        console.log("Can't connect to PLC", err);
    } else {
        console.log("PLC connected");           
    }
});

async function getAllStatus() {
    try {
        // Batch read coils for buttons and lamps
        const buttonsAndLampsResponse = await Promise.all([
            client.readCoils(dataAddressPlc.button_1, 2), 
            client.readCoils(dataAddressPlc.button_2, 2),
            client.readCoils(dataAddressPlc.button_door_1, 2), 
            client.readCoils(dataAddressPlc.button_door_2, 2), 
        ]);

        const [button1Response, button2Response, buttonDoor1Response, buttonDoor2Response] = buttonsAndLampsResponse;

        const button_1 = button1Response.data[0] ? 1 : 0;
        const lamp_1 = button1Response.data[1] ? 1 : 0;
        const button_2 = button2Response.data[0] ? 1 : 0;
        const lamp_2 = button2Response.data[1] ? 1 : 0;
        const button_door_1 = buttonDoor1Response.data[0] ? 1 : 0;
        const status_door_1 = buttonDoor1Response.data[1] ? 1 : 0;
        const button_door_2 = buttonDoor2Response.data[0] ? 1 : 0;
        const status_door_2 = buttonDoor2Response.data[1] ? 1 : 0;

       
        const registersResponse = await Promise.all([
            client.readHoldingRegisters(dataAddressPlc.suhu, 1),
            client.readHoldingRegisters(dataAddressPlc.kelembaban, 1),
            client.readHoldingRegisters(dataAddressPlc.voltage, 1),
            client.readHoldingRegisters(dataAddressPlc.arus, 1),
            client.readHoldingRegisters(dataAddressPlc.kwh, 1),
        ]);

        const suhu = registersResponse[0].data[0];
        const kelembaban = registersResponse[1].data[0];
        const voltage = registersResponse[2].data[0];
        const arus = registersResponse[3].data[0];
        const kwh = registersResponse[4].data[0];

        return {
            button_1,
            lamp_1,
            button_2,
            lamp_2,
            button_door_1,
            status_door_1,
            button_door_2,
            status_door_2,
            suhu,
            kelembaban,
            voltage,
            arus,
            kwh
        };
    } catch (error) {
        console.log("error get all status", error);
    }
}


function writeDataCoil(register, value) {
    return new Promise((resolve, reject) => {
        client.writeCoil(register, value, (writeErr, response) => {
            if (writeErr) {
                console.error("Error writing register:", writeErr);
                reject(writeErr);
            } else {
                console.log("Write successful:", response);
                resolve(response);
            }
        });
    });
}

const dataAddress = 
    {
        button_1: 0,
        lamp_1: 3,
        button_2: 4,
        lamp_2: 7
    }

export const readSensor = async (req, res) => {
    try {
        client.connect();
        const data = await client.readHoldingRegisters(
           dataAddress.addressLamp1,
           1,
        );
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const readAllSensor = async (req, res) => {
    try {
        const data = await client.readHoldingRegisters(
           dataAddress.addressLamp1,
           10,
        );
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const writeData = async (req, res) => {
    try {
         await client.writeRegister(
           dataAddress.addressLamp1,
           1,
        );
        readAllSensor();

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { getAllStatus, writeDataCoil };