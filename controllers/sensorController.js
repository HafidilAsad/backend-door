import client from "../config/modbusConfig.js";

export const readSensor = async (req, res) => {
    try {
        const data = await client.readHoldingRegisters(
            process.env.MODBUS_REG_START,
            process.env.MODBUS_REG_END
        );
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}