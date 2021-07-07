'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jenis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rapid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      swab: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      pcr: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      swab_antigen: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      sars_cov_2: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('jenis');
  },
};
