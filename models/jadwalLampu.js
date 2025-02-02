export default (sequelize, DataTypes) => {
  return sequelize.define('JadwalLampu', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lampu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Lampu',
        key: 'id',
      },
    },
    hari: {
      type: DataTypes.ENUM('senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'),
      allowNull: false,
    },
    jam_on: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    jam_off: {
      type: DataTypes.TIME,
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
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  }, {
    tableName: 'JadwalLampu' // ✅ Tetapkan nama tabel secara eksplisit
  });
};
