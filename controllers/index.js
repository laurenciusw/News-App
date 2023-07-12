const { comparePassword, encodeToken } = require("../helpers/helper");
const { User, Article, Category, History } = require("../models/");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class Controller {
  static async getArticles(req, res, next) {
    try {
      const articles = await Article.findAll({
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      });
      console.log(articles);
      res.status(200).json(articles);
    } catch (error) {
      next(error);
    }
  }

  static async getArticleyId(req, res, next) {
    try {
      let article = await Article.findByPk(req.params.id);
      if (!article) throw { name: "NotFound" };
      res.status(200).json(article);
    } catch (error) {
      next(error);
    }
  }

  static async createArticle(req, res, next) {
    try {
      console.log(req.body);
      let { title, content, imgUrl, categoryId } = req.body;

      if (!categoryId) throw { name: "categoryRequired" };

      let newArticle = await Article.create({
        title,
        content,
        imgUrl,
        authorId: req.user.id,
        categoryId,
      });
      console.log(req.user);

      let newHistory = await History.create({
        title: newArticle.title,
        description: `Article  with id ${newArticle.id} has been created `,
        updatedBy: req.user.email,
      });

      res.status(201).json(newArticle);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteArticle(req, res, next) {
    try {
      let id = req.params.id;
      let article = await Article.findByPk(id);

      if (!article) throw { name: "NotFound" };
      await Article.destroy({
        where: { id },
      });
      res
        .status(200)
        .json({ message: `Article with id ${id} succes to delete` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      if (!email) throw { name: "EmailRequired" };

      if (!password) throw { name: "PasswordRequired" };

      const user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        role: "admin",
        address,
      });
      res.status(201).json({
        message: `user with email ${email} succesfully created`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;

      if (!email) throw { name: "EmailRequired" };

      if (!password) throw { name: "PasswordRequired" };

      const user = await User.findOne({ where: { email } });

      if (!user) throw { name: "InvalidCredentials" };

      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) throw { name: "InvalidCredentials" };

      let payload = {
        id: user.id,
      };

      let access_token = encodeToken(payload);
      let userRole = user.role;

      res.status(200).json({
        access_token,
        email,
        userRole,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      let google_token = req.headers.google_token;

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      let user = await User.findOne({
        where: { email: payload.email },
      });
      if (!user) {
        user = await User.create({
          username: payload.name,
          email: payload.email,
          password: Math.random() + "ABCD",
          role: "staff",
        });
      }
      let payload_access_token = {
        id: user.id,
      };
      let access_token = encodeToken(payload_access_token);
      let userRole = user.role;
      let userEmail = user.email;
      res.status(200).json({
        access_token,
        userRole,
        userEmail,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async editArticle(req, res, next) {
    try {
      let id = req.params.id;
      let newData = {
        title: req.body.title,
        content: req.body.content,
        imgUrl: req.body.imgUrl,
        categoryId: req.body.categoryId,
      };
      let article = await Article.findByPk(id);
      if (!article) throw { name: "NotFound" };

      await Article.update(newData, { where: { id } });
      console.log(req.user);
      let newHistory = await History.create({
        title: article.title,
        description: `Article with id ${id} has been updated`,
        updatedBy: req.user.email,
      });

      res
        .status(200)
        .json({ message: `Article with id ${id} has been updated` });
    } catch (error) {
      next(error);
    }
  }

  static async changeStatus(req, res, next) {
    try {
      let id = req.params.id;
      let newStatus = {
        status: req.body.status,
      };

      let article = await Article.findByPk(id);
      if (!article) throw { name: "NotFound" };

      await Article.update(newStatus, { where: { id } });

      let newHistory = await History.create({
        title: article.title,
        description: `Article status with id ${id} has been updated from ${article.status} to ${req.body.status}`,
        updatedBy: req.user.email,
      });

      res.status(200).json({
        message: `cuisine status with id ${id} has benn changed to ${newStatus}`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getHistory(req, res, next) {
    try {
      const history = await History.findAll({
        order: [["createdAt", "desc"]],
      });

      res.status(200).json(history);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
