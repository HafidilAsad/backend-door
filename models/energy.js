export default (sequelize, DataTypes) => {
    const Energy = sequelize.define('Energy', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        kwh: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        humidity: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        temperature: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedBy: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        tableName: 'energy',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: false,
        paranoid: false,
        freezeTableName: true,
    });

    return Energy;
};