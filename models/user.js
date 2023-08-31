'use strict';
const { Model } = require('sequelize');
const { hashingPassword } = require('../helpers/bcrypt-helpers');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Movie, {
        foreignKey: 'authorId',
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
        validate: {
          notNull: {
            msg: 'mail cannot be empty',
          },
          notEmpty: {
            msg: 'mail cannot be empty string',
          },
          isEmail: {
            msg: 'invalid format mail',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 10],
            msg: 'password must be 5 character',
          },
          notNull: {
            msg: 'password cannot be empty',
          },
          notEmpty: {
            msg: 'password cannot be empty string',
          },
        },
      },
      role: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (instance, options) => {
          instance.password = hashingPassword(instance.password);
        },
      },
    }
  );
  return User;
};
