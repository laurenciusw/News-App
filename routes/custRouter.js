const custController = require("../controllers/custController");
const { custAuthentiaction } = require("../middlewares/auth");
const custRouter = require("express").Router();

custRouter.post("/pub/register", custController.register);

custRouter.post("/pub/login", custController.login);

custRouter.post("/pub/googleLogin", custController.googleLogin);

custRouter.get("/pub/articles", custController.getArticles);

custRouter.get("/pub/articles/:id", custController.articleDetail);

custRouter.get("/pub/bookmark", custAuthentiaction, custController.getBookmark);

custRouter.post(
  "/pub/bookmark/:id",
  custAuthentiaction,
  custController.createBookmark
);

module.exports = custRouter;
