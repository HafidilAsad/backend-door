import dotenv from 'dotenv';
dotenv.config(); // Ensure environment variables are loaded

import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config.js'; 
import lampuModel from './lampu.js';
import jadwalLampuModel from './jadwalLampu.js';
import EnergyModel from './energy.js';
import cronJobModel from './cronJob.js';

const env = process.env.NODE_ENV || 'development';
const configEnv = config[env];  

const sequelize = new Sequelize(configEnv);

const Lampu = lampuModel(sequelize, DataTypes);
const JadwalLampu = jadwalLampuModel(sequelize, DataTypes);
const Energy = EnergyModel(sequelize, DataTypes);
const CronJob = cronJobModel(sequelize, DataTypes);

Lampu.hasMany(JadwalLampu, { foreignKey: 'lampu_id' });
JadwalLampu.belongsTo(Lampu, { foreignKey: 'lampu_id' });

export { sequelize, Lampu, JadwalLampu, Energy, CronJob };
