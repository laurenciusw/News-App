const Controller = require("../controllers");
const {
  authentiaction,
  authorization,
  authAdmin,
} = require("../middlewares/auth");
const articleRouter = require("express").Router();

articleRouter.get("/articles", authentiaction, Controller.getArticles);

articleRouter.post("/articles", authentiaction, Controller.createArticle);

articleRouter.get("/categories", authentiaction, Controller.getCategories);

articleRouter.get("/articles/:id", authentiaction, Controller.getArticleyId);

articleRouter.delete(
  "/articles/:id",
  authentiaction,
  authorization,
  Controller.deleteArticle
);

articleRouter.patch(
  "/articles/:id",
  authentiaction,
  authAdmin,
  Controller.changeStatus
);

articleRouter.put("/articles/:id", authentiaction, Controller.editArticle);

articleRouter.get("/histories", Controller.getHistory);

module.exports = articleRouter;
