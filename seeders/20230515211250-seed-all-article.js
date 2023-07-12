"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let dataPosts = require("../articles.json");
    dataPosts.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Articles", dataPosts);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Articles");
  },
};
