import cron from 'node-cron';
import axios from 'axios';
import { log, errorLogger } from '../utils/logger.js';
import { CronJob } from '../models/index.js';

let cronJobs = {};

const loadCronJobsFromDB = async () => {
    const jobs = await CronJob.findAll();
    jobs.forEach(job => {
        cronJobs[job.button] = {
            turnOnTime: job.turnOnTime,
            turnOffTime: job.turnOffTime,
            turnOnJob: null,
            turnOffJob: null
        };
    });
    scheduleCronJobs();
};

const scheduleCronJobs = () => {
    Object.keys(cronJobs).forEach(button => {
        const { turnOnTime, turnOffTime } = cronJobs[button];

        if (cronJobs[button].turnOnJob) cronJobs[button].turnOnJob.stop();
        cronJobs[button].turnOnJob = cron.schedule(turnOnTime, async () => {
            try {
                await axios.post(`https://solusiprogrammer.com/api/control/${button}/1`);
                log(`running turn on ${button}`);
            } catch (error) {
                errorLogger(`failed turn on ${button}, ${error}`);
            }
        });

        if (cronJobs[button].turnOffJob) cronJobs[button].turnOffJob.stop();
        cronJobs[button].turnOffJob = cron.schedule(turnOffTime, async () => {
            try {
                await axios.post(`https://solusiprogrammer.com/api/control/${button}/0`);
                log(`running turn off ${button}`);
            } catch (error) {
                errorLogger(`failed turn off ${button}, ${error}`);
            }
        });
    });
};

loadCronJobsFromDB();

const getCronTimes = async (req, res) => {
    const jobs = await CronJob.findAll();
    const cronTimes = jobs.reduce((acc, job) => {
        acc[job.button] = {
            turnOnTime: job.turnOnTime,
            turnOffTime: job.turnOffTime,
            createdAt: job.createdAt,
            updatedAt: job.updatedAt
        };
        return acc;
    }, {});
    res.status(200).json(cronTimes);
};

const updateCronTimes = async (req, res) => {
    const { button, turnOnTime, turnOffTime } = req.body;

    if (button && cronJobs[button]) {
        if (turnOnTime) {
            cronJobs[button].turnOnTime = turnOnTime;
        }
        if (turnOffTime) {
            cronJobs[button].turnOffTime = turnOffTime;
        }
        await CronJob.update({ turnOnTime, turnOffTime }, { where: { button } });
        scheduleCronJobs();
        res.status(200).json({ message: 'Cron job times updated successfully' });
    } else {
        res.status(400).json({ error: 'Invalid button or times' });
    }
};

const addCronJob = async (req, res) => {
    const { button, turnOnTime, turnOffTime } = req.body;

    if (button && turnOnTime && turnOffTime) {
        cronJobs[button] = {
            turnOnTime,
            turnOffTime,
            turnOnJob: null,
            turnOffJob: null
        };
        await CronJob.create({ button, turnOnTime, turnOffTime });
        scheduleCronJobs();
        res.status(200).json({ message: `Cron job for ${button} added successfully` });
    } else {
        res.status(400).json({ error: 'Invalid button or times' });
    }
};

const deleteCronJob = async (req, res) => {
    const { button } = req.body;

    if (button && cronJobs[button]) {
        if (cronJobs[button].turnOnJob) cronJobs[button].turnOnJob.stop();
        if (cronJobs[button].turnOffJob) cronJobs[button].turnOffJob.stop();
        delete cronJobs[button];
        await CronJob.destroy({ where: { button } });
        res.status(200).json({ message: `Cron job for ${button} deleted successfully` });
    } else {
        res.status(400).json({ error: 'Invalid button' });
    }
};

export { getCronTimes, updateCronTimes, addCronJob, deleteCronJob };