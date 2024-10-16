import client from "../config/modbusConfig.js";

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