'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.belongsTo(models.User, {
        foreignKey: 'authorId',
      });
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'title cannot be empty',
          },
          notEmpty: {
            msg: 'title cannot be empty string',
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'description cannot be empty',
          },
          notEmpty: {
            msg: 'description cannot be empty string',
          },
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'rating cannot be empty',
          },
          notEmpty: {
            msg: 'rating cannot be empty string',
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Movie',
    }
  );
  return Movie;
};
