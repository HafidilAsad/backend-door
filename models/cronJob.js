export default (sequelize, DataTypes) => {
    const CronJob = sequelize.define('CronJob', {
        button: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        turnOnTime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        turnOffTime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    }, {
        tableName: 'cron_jobs',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: false,
        paranoid: false,
        freezeTableName: true,
    });

    return CronJob;
};