const { decodeToken } = require("../helpers/helper");
const { User, Article, Category, Customer } = require("../models/");

//user authentication
async function authentiaction(req, res, next) {
  let access_token = req.headers.access_token;
  try {
    if (!access_token) {
      throw { name: "invalidToken" };
    }

    let payload = decodeToken(access_token);
    let user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "invalidToken" };
    }
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    next(error);
  }
}

//cust authenntication
async function custAuthentiaction(req, res, next) {
  let access_token = req.headers.access_token;
  try {
    if (!access_token) {
      throw { name: "invalidToken" };
    }

    let payload = decodeToken(access_token);
    let user = await Customer.findByPk(payload.id);
    if (!user) {
      throw { name: "invalidToken" };
    }
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    next(error);
  }
}

async function authorization(req, res, next) {
  try {
    let userId = req.user.id;
    let role = req.user.role;
    let article = await Article.findByPk(req.params.id);

    if (!article) {
      throw { name: "NotFound" };
    }
    if (role == "staff") {
      if (userId !== article.authorId) {
        throw { name: "Forbidden" };
      }
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function authAdmin(req, res, next) {
  try {
    let userId = req.user.id;
    let role = req.user.role;
    let article = await Article.findByPk(req.params.id);

    if (!article) {
      throw { name: "NotFound" };
    }
    if (role == "staff") {
      throw { name: "Forbidden" };
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  custAuthentiaction,
  authentiaction,
  authorization,
  authAdmin,
};
