'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('emojis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      character: {
        type: Sequelize.STRING
      },
      codePoint: {
        type: Sequelize.STRING
      },
      group: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      subgroup: {
        type: Sequelize.STRING
      },
      unicodeName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('emojis');
  }
};