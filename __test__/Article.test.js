const app = require("../app");
const request = require("supertest");
const { Customer } = require("../models");
const { sequelize } = require("../models");

const { encodeToken, hashPassword } = require("../helpers/helper.js");

const access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg1OTE4MTQyfQ.lh8d0n9tbzY9lgz2CPczACbaCmLqgE39maeDinF0abE";
const invalidToken = "gdukyfkuggbl.b";

beforeAll(async () => {
  try {
    let user = require("../data.json").Customers;
    user.forEach((e) => {
      e.password = hashPassword(e.password);
      e.createdAt = e.updatedAt = new Date();
    });
    await sequelize.queryInterface.bulkInsert("Customers", user, {
      restartIdentity: true,
      cascade: true,
      truncate: true,
    });

    let category = require("../categories.json").Categories;
    category.forEach((e) => {
      e.createdAt = e.updatedAt = new Date();
    });
    await sequelize.queryInterface.bulkInsert("Categories", category, {
      restartIdentity: true,
      cascade: true,
      truncate: true,
    });

    const data = require("../articles.json").Articles;
    data.forEach((e) => {
      e.createdAt = e.updatedAt = new Date();
    });
    await sequelize.queryInterface.bulkInsert("Articles", data, {
      restartIdentity: true,
      cascade: true,
      truncate: true,
    });
    const bookmark = {
      CustId: "1",
      ArticleId: "1",
    };
    await sequelize.queryInterface.bulkInsert("Bookmarks", bookmark, {
      restartIdentity: true,
      cascade: true,
      truncate: true,
    });
  } catch (error) {
    console.log(error, "ini console log di cuisine ");
  }
});
afterAll(async () => {
  try {
    await sequelize.queryInterface.bulkDelete("Users");
    await sequelize.queryInterface.bulkDelete("Categories");
    await sequelize.queryInterface.bulkDelete("cuisines");
    await sequelize.queryInterface.bulkDelete("Bookmarks");
  } catch (error) {
    console.log(error, "ini console log di cuisine");
  }
});

describe("GET /pub/articles", () => {
  it("200 Success get inventories", async () => {
    const response = await request(app).get("/pub/articles");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body.totalPage).toEqual(expect.any(Number));
  });
  it("should response with status 200 - without access_token when providing a certain page (check the pagination)", async () => {
    const response = await request(app).get("/pub/articles?page=1");
    expect(response.body.totalPage).toEqual(expect.any(Number));
    expect(response.body.data.length).toBeLessThanOrEqual(9);
  });
  it("should response with status 200 - without access_token when providing a certain page (check the pagination)", async () => {
    const response = await request(app).get("/pub/articles/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });
});

describe("GET /pub/bookmark", () => {
  it("200 Success get bookmark", async () => {
    const response = await request(app)
      .get("/pub/bookmark")
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
  it("201 Success add bookmark", async () => {
    const data = {
      cuisineId: "1",
    };
    const response = await request(app)
      .post("/pub/bookmark/1")
      // .send(data)
      .set("access_token", access_token);
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({
      message: "success added to whislist",
    });
  });

  it("400 failed add bookmark", async () => {
    const data = {
      ArticleId: "9999",
    };
    const response = await request(app)
      .post("/pub/bookmark/9999")
      .set("access_token", access_token);
    console.log(response.body);
    console.log(access_token, "<<<<<<<<<<");
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Data not found");
  });
  it("200 failed get bookmark", async () => {
    const response = await request(app).get("/pub/bookmark");

    expect(response.status).toBe(401);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toEqual({
      message: "invalid token",
    });
  });
  it("200 failde get bookmark", async () => {
    const response = await request(app)
      .get("/pub/bookmark")
      .set("access_token", invalidToken);

    expect(response.status).toBe(401);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toEqual({
      message: "invalid token",
    });
  });
});
