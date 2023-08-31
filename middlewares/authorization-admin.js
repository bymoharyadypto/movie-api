const { Movie } = require('../models');

async function authorizationAdmin(req, res, next) {
  try {
    const res = await Movie.findByPk(req.params.id);
    if (!res) throw { name: 'DataNotFound' };
    console.log(res);
    if (req.user.role === 'admin') return next();
    if (req.user.id !== res.authorId) throw { name: 'Forbidden' };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorizationAdmin;
