const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models/index');
const { queryInterface } = sequelize;
const { hashingPassword } = require('../helpers/bcrypt-helpers');
const { sign } = require('../helpers/jwt-helpers');

let user = [
  {
    email: 'dia@mail.com',
    password: hashingPassword('123456'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let list_movies = require('../data_for_test/data.json');
list_movies.map((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
  return el;
});

let access_token;

beforeAll(async () => {
  await queryInterface.bulkDelete('Users', user, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete('Movies', list_movies, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await queryInterface.bulkInsert('Users', user);
  await queryInterface.bulkInsert('Movies', list_movies);

  access_token = sign({ id: 2, email: user[0].email });
});

describe('testing endpoint public movie', () => {
  test('berhasil mendapatkan list movie dengan access_token tanpa query filter parameter', (done) => {
    request(app)
      .get('/movies')
      .set('access_token', access_token)
      .expect(200)
      .then(({ body }) => {
        expect(body.movies.length).toBe(4);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test('berhasil menambahkan movie ke entitas utama dengan id yang sesuai', (done) => {
    request(app)
      .post('/movies')
      .set('access_token', access_token)
      .send({
        title: 'test-movie',
        description: 'desc-movie',
        imgUrl: 'aaaaa',
        rating: 9,
        authorId: 1,
      })
      .expect(201)
      .then(({ body }) => {
        expect(body);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test('berhasil update movie dengan id yang sesuai', (done) => {
    const movieId = 1;
    const updatedData = {
      title: 'test-movie updated',
      description: 'desc-movie updated',
      imgUrl: 'aaaaa',
      rating: 9,
      authorId: 1,
    };
    request(app)
      .put(`/movies/${movieId}`)
      .set('access_token', access_token)
      .send(updatedData)
      .expect(200)
      .then(({ body }) => {
        expect(body.movie);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test('berhasil mendapatkan entitas utama baik tanpa atau dengan access_token dengan 1 query filter parameter', (done) => {
    request(app)
      .get('/movies?title=Test')
      .set('access_token', access_token)
      .expect(200)
      .then(({ body }) => {
        expect(body.movies.length).toBe(4);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test('berhasil mendapatkan 1 entitas utama sesuai dengan params id yang diberikan', (done) => {
    request(app)
      .get('/movies/10')
      .set('access_token', access_token)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test('gagal mendapatkan entitas utama karena params id yang diberikan tidak ada di database', (done) => {
    request(app)
      .get('/movies/25')
      .set('access_token', access_token)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toEqual('Data Not Found');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test('gagal mendapatkan list movies karena belum sign-in', (done) => {
    request(app)
      .get('/movies')
      .expect(401)
      .then(({ body }) => {
        expect(body.message).toMatch('Missing Access Token');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test('gagal menambahkan movie karena belum sign-in', (done) => {
    request(app)
      .post('/movies')
      .send({
        title: 'test-movie',
        description: 'desc-movie',
        imgUrl: 'aaaaa',
        rating: 9,
        authorId: 1,
      })
      .expect(401)
      .then(({ body }) => {
        expect(body);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test('berhasil menambahkan movie ke entitas utama dengan id yang sesuai', (done) => {
    const movieId = 1;
    const updatedData = {
      title: 'test-movie updated',
      description: 'desc-movie updated',
      imgUrl: 'aaaaa',
      rating: 9,
      authorId: 1,
    };
    request(app)
      .put(`/movies/25`)
      .set('access_token', access_token)
      .send(updatedData)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toEqual('Data Not Found');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});
