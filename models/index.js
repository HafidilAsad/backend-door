import dotenv from 'dotenv';
dotenv.config(); // Ensure environment variables are loaded

import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config.js';  // Use import instead of require
import lampuModel from './lampu.js';
import jadwalLampuModel from './jadwalLampu.js';

const env = process.env.NODE_ENV || 'development';
const configEnv = config[env];  // Get the configuration for the current environment

const sequelize = new Sequelize(configEnv);

const Lampu = lampuModel(sequelize, DataTypes);
const JadwalLampu = jadwalLampuModel(sequelize, DataTypes);

Lampu.hasMany(JadwalLampu, { foreignKey: 'lampu_id' });
JadwalLampu.belongsTo(Lampu, { foreignKey: 'lampu_id' });

export { sequelize, Lampu, JadwalLampu };
