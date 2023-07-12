const articleRouter = require("./articleRouter");
const custRouter = require("./custRouter");
const userRouter = require("./userRouter");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "masuk",
  });
});

router.use(userRouter);
router.use(custRouter);
router.use(articleRouter);

module.exports = router;
