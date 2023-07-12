const { comparePassword, encodeToken } = require("../helpers/helper");
const { Op } = require("sequelize");

const {
  Customer,
  Article,
  Category,
  History,
  Bookmark,
} = require("../models/");
const axios = require("axios");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class custController {
  //cust register
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      if (!email) throw { name: "EmailRequired" };

      if (!password) throw { name: "PasswordRequired" };

      const user = await Customer.create({
        username,
        email,
        password,
        phoneNumber,
        role: "Customer",
        address,
      });
      res.status(201).json({
        message: `Customer with email ${email} succesfully created`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //cust login
  static async login(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;

      if (!email) throw { name: "EmailRequired" };

      if (!password) throw { name: "PasswordRequired" };

      const user = await Customer.findOne({ where: { email } });

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
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //google login
  static async googleLogin(req, res, next) {
    try {
      let google_token = req.headers.google_token;

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      let user = await Customer.findOne({
        where: { email: payload.email },
      });
      if (!user) {
        user = await Customer.create({
          username: payload.name,
          email: payload.email,
          password: Math.random() + "ABCD",
          role: "Customer",
        });
      }
      let payload_access_token = {
        id: user.id,
      };
      let access_token = encodeToken(payload_access_token);
      let userRole = user.role;
      let userEmail = user.email;
      console.log(userEmail);
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

  //get articles
  static async getArticles(req, res, next) {
    const { page, filter, categorySearch } = req.query;

    console.log(req.query, "asd");
    let query = {
      limit: 9,
      where: { status: "Active" },
      order: [["id", "ASC"]],
    };

    if (page) {
      query.offset = (page - 1) * query.limit;
    }

    if (categorySearch) {
      query.where.categoryId = categorySearch;
    }

    if (filter) {
      query.where = {
        ...query.where,
        title: {
          [Op.iLike]: `%${filter}%`,
        },
      };
    }

    console.log(req.query);
    try {
      let { count, rows } = await Article.findAndCountAll(query);
      const result = {
        totalPage: Math.ceil(count / query.limit),
        currentPage: page,
        data: rows,
      };
      res.status(200).json(result);
    } catch (error) {
      console.log(error, "<<<<<<<");
      next(error);
    }
  }
  // detail
  static async articleDetail(req, res, next) {
    try {
      let article = await Article.findByPk(req.params.id);
      if (!article) throw { name: "NotFound" };

      const baseurl =
        "https://api.qr-code-generator.com/v1/create?access-token=fdIk53xJz0ecW724ewXsDgXpTj38SrTdSvZrEnnKQtcR4Vo8Nehn2dScGYj2ilpE";

      const { data } = await axios({
        url: baseurl,
        method: "post",
        data: {
          frame_name: "no-frame",
          qr_code_text: `http://localhost:3000/pub/articles/${req.params.id}`,
          image_format: "SVG",
          qr_code_logo: "scan-me-square",
        },
      });

      article.dataValues.qr = data;
      res.status(200).json(article);
    } catch (error) {
      console.log(error, "asdasd");
      next(error);
    }
  }
  // create bookmark
  static async createBookmark(req, res, next) {
    try {
      let article = await Article.findByPk(req.params.id);
      if (!article) throw { name: "NotFound" };
      console.log(req.user);

      let newBookmark = await Bookmark.create({
        CustId: req.user.id,
        ArticleId: article.id,
      });

      res.status(201).json(newBookmark);
    } catch (error) {
      console.log(error, "<<<");
      next(error);
    }
  }

  //get bookmark
  static async getBookmark(req, res, next) {
    try {
      let CustId = req.user.id;

      const data = await Bookmark.findAll({
        where: { CustId },
        include: {
          model: Article,
        },
      });
      // console.log(data);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = custController;
