const { verify } = require('../helpers/jwt-helpers');
const { User } = require('../models');

async function authentication(req, res, next) {
  try {
    if (!req.headers.access_token) throw { name: 'MissingAccessToken' };
    const payload = verify(req.headers.access_token);
    const { email } = payload;
    const data = await User.findOne({ where: { email } });
    if (!data) throw { name: 'Unauthorized' };
    req.user = {
      id: data.id,
      username: data.username,
      email: data.email,
      role: data.role,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
