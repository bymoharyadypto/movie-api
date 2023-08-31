const { sign } = require('../helpers/jwt-helpers');
const { comparePassword } = require('../helpers/bcrypt-helpers');
const { User, Movie } = require('../models/');
const { Op } = require('sequelize');

class adminControllers {
  static async register(req, res, next) {
    const { username, email, password, phoneNumber, address } = req.body;
    try {
      const newUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
        role: 'admin',
      });
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async signIn(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        attributes: { email, password },
        where: { email },
      });
      if (!user) throw { name: 'EmailorPasswordNotFound' };
      else if (!user.length === undefined) throw { name: 'EmailorPasswordNotFound' };
      else if (!comparePassword(password, user.password)) throw { name: 'InvalidPassword' };
      const access_token = sign({ id: user.id, email });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static getPagingData(dataProduct, page, limit) {
    const { count: totalItems, rows: movies } = dataProduct;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, movies, totalPages, currentPage };
  }

  static getPagination(page) {
    const limit = 4;
    if (page === 1) {
      let offset = 0;
      return { limit, offset };
    } else {
      let offset = page ? page * limit - 4 : 0;
      return { limit, offset };
    }
  }

  static async getMovies(req, res, next) {
    const title = req.query.title || '';
    const { page } = req.query;
    const { limit, offset } = adminControllers.getPagination(page);
    try {
      const movies = await Movie.findAndCountAll({
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'email', 'role'],
          },
        ],
        order: [['id', 'ASC']],
        where: {
          title: { [Op.iLike]: `%${title}%` },
        },
        offset,
        limit,
      });
      const resMovies = adminControllers.getPagingData(movies, page, limit);
      res.status(200).json(resMovies);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async getMovie(req, res, next) {
    try {
      const getMovie = await Movie.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['id', 'email', 'username', 'role'],
          },
        ],
        order: [['id', 'ASC']],
      });
      if (!getMovie) throw { name: 'DataNotFound' };
      res.status(200).json({ Movie: getMovie });
    } catch (error) {
      next(error);
    }
  }

  static async postMovie(req, res, next) {
    const { title, description, imgUrl, rating } = req.body;
    try {
      const postMovie = await Movie.create({
        title,
        description,
        imgUrl,
        rating,
        authorId: req.user.id,
      });
      res.status(201).json({ news: postMovie });
    } catch (error) {
      next(error);
    }
  }

  static async updatedMovies(req, res, next) {
    const { title, description, imgUrl, rating } = req.body;
    try {
      const getMovie = await Movie.findByPk(req.params.id);
      if (!getMovie) throw { name: 'DataNotFound' };
      const updateMovie = await Movie.update(
        {
          title,
          description,
          imgUrl,
          rating,
        },
        {
          where: { id: req.params.id },
          returning: true,
        }
      );

      let movieUpdated = updateMovie[1][0];
      res.status(200).json({ movie: movieUpdated });
    } catch (error) {
      next(error);
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const getMovie = await Movie.findByPk(req.params.id, {
        where: {
          id: req.params.id,
        },
      });
      if (!getMovie) throw { name: 'DataNotFound' };
      await Movie.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: `title: ${getMovie.title} with id: ${getMovie.id}, has been deleted by ${req.user.role}` });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async updateMovie(req, res, next) {
    let { title } = req.body;
    let tempData = [];
    try {
      const getMovie = await Movie.findByPk(req.params.id);
      if (!getMovie) throw { name: 'DataNotFound' };
      const updateTitle = await Movie.update({ title }, { where: { id: req.params.id }, returning: true });
      tempData = updateTitle[1][0];
      res.status(200).json({ message: `title: ${tempData.title} with id: ${tempData.id}, has been updated by ${req.user.role}`, movie: tempData });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = adminControllers;
