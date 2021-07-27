'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jenis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
    static async getList() {
      return [
        { name: 'rapid', pl: 'Rapid', value: false },
        { name: 'swab', pl: 'Swab', value: false },
        { name: 'pcr', pl: 'PCR', value: false },
        { name: 'swab_antigen', pl: 'Swab Antigen', value: false },
        { name: 'sars_cov_2', pl: 'SARS-CoV-2', value: false },
      ];
    }
  }
  jenis.init(
    {
      rapid: DataTypes.BOOLEAN,
      swab: DataTypes.BOOLEAN,
      pcr: DataTypes.BOOLEAN,
      swab_antigen: DataTypes.BOOLEAN,
      sars_cov_2: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'jenis',
    }
  );
  return jenis;
};
