import client from "../config/modbusConfig.js";

const dataAddress = 
    {
        addressLamp1:50,
        addressLamp2:51,
        addressLamp3:52,
        addressLamp4:53,
        addressLamp5:54,
        addressLamp6:55,
        addressLamp7:56,
        addressLamp8:57,
        addressLamp9:58,
    }

export const readSensor = async (req, res) => {
    try {
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