'use strict';
const { Model } = require('sequelize');
const kecamatan = [
  { name: 'Babakan Madang', value: false },
  { name: 'Bogor Barat', value: false },
  { name: 'Bogor Selatan', value: false },
  { name: 'Bogor Tengah', value: false },
  { name: 'Bogor Timur', value: false },
  { name: 'Bogor Utara', value: false },
  { name: 'Bojong Gede', value: false },
  { name: 'Cibinong', value: false },
  { name: 'Cileungsi', value: false },
  { name: 'Gunung Sindur', value: false },
  { name: 'Jonggol', value: false },
  { name: 'Parung', value: false },
  { name: 'Sukaraja', value: false },
  { name: 'Tanah Sareal', value: false },
];
module.exports = (sequelize, DataTypes) => {
  class lokasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.jenis, {
        foreignKey: 'jenis_id',
        as: 'jenis',
      });
    }
    static async getAll(where = []) {
      const exclude = ['password', 'createdAt', 'updatedAt'];
      return await this.findAll({
        where,
        include: [{ model: sequelize.models.jenis, as: 'jenis', attributes: { exclude } }],
        attributes: { exclude },
        order: [['id', 'ASC']],
      })
        .then(result => result)
        .catch(err => {
          console.log(err);
          return err;
        });
    }
    static async getOne(where = []) {
      const exclude = ['password', 'createdAt', 'updatedAt'];
      return await this.findOne({
        where,
        include: [{ model: sequelize.models.jenis, as: 'jenis', attributes: { exclude } }],
        attributes: { exclude },
        order: [['id', 'ASC']],
      })
        .then(result => result)
        .catch(err => {
          console.log(err);
          return err;
        });
    }
    static async getList() {
      return [
        { name: 'name', pl: 'Name', value: '' },
        { name: 'alamat', pl: 'Alamat', value: '' },
        { name: 'kecamatan', pl: 'Kecamatan', kecamatan },
        { name: 'waktuOprational', pl: 'Waktu Oprational', value: '' },
        { name: 'biaya', pl: 'Biaya', value: '' },
        { name: 'latitude', pl: 'Latitude', value: '' },
        { name: 'longitude', pl: 'Longitude', value: '' },
      ];
    }
  }
  lokasi.init(
    {
      name: DataTypes.STRING,
      jenis_id: DataTypes.INTEGER,
      alamat: DataTypes.STRING,
      kecamatan: DataTypes.STRING,
      waktuOprational: DataTypes.STRING,
      biaya: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      foto: DataTypes.STRING,
      publish: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'lokasi',
    }
  );
  return lokasi;
};
