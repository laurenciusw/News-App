"use strict";

const { hashPassword } = require("../helpers/helper");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../customer.json");
    data.forEach((el) => {
      el.password = hashPassword(el.password);
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Customers", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Customers");
  },
};
