"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Articles", "status", {
      type: Sequelize.STRING,
      defaultValue: "Active",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Articles", "status");
  },
};
