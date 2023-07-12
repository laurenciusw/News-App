const Controller = require("../controllers");
const userRouter = require("express").Router();

userRouter.post("/users/register", Controller.register);

userRouter.post("/users/login", Controller.login);

userRouter.post("/users/google-login", Controller.googleLogin);

module.exports = userRouter;
