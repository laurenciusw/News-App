"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.belongsTo(models.Category, { foreignKey: "categoryId" });
      Article.belongsTo(models.User, { foreignKey: "authorId" });
      Article.belongsToMany(models.Customer, {
        through: models.Bookmark,
        foreignKey: "ArticleId",
      });
    }
  }
  Article.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Input the News Title`,
          },
          notEmpty: {
            msg: `Input the News Title`,
          },
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Input the News Content`,
          },
          notEmpty: {
            msg: `Input the News Content`,
          },
        },
      },
      imgUrl: DataTypes.STRING,
      authorId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
