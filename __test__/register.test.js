const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models/index');
const { queryInterface } = sequelize;

beforeAll(async () => {
  await queryInterface.bulkDelete('Users', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe('testing endpoint register', () => {
  test('berhasil register, response 201', (done) => {
    request(app)
      .post('/register')
      .set('Content-Type', 'application/json')
      .send({
        username: 'dia',
        email: 'dia@mail.com',
        password: '123456',
      })
      .expect(201)
      .then(({ body }) => {
        expect(body);
        done();
      })
      .catch((error) => {
        console.log(error);
        done(error);
      });
  });

  test('email tidak diberikan / tidak di input, response 400', (done) => {
    request(app)
      .post('/register')
      .set('Content-Type', 'application/json')
      .send({
        username: 'test1',
        password: '12345',
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.message[0]).toMatch('mail cannot be empty');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test('password tidak diberikan / tidak di input, response 400', (done) => {
    request(app)
      .post('/register')
      .set('Content-Type', 'application/json')
      .send({
        username: 'test1',
        email: 'test1@mail.com',
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.message[0]).toMatch('password cannot be empty');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test('email diberikan string kosong, response 400', (done) => {
    request(app)
      .post('/register')
      .set('Content-Type', 'application/json')
      .send({
        username: 'test1',
        email: '',
        password: '12345',
        phoneNumber: '+62456789012',
        address: 'Jl. Mawar',
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.message[0]).toMatch('mail cannot be empty string');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test('password diberikan string kosong, response 400', (done) => {
    request(app)
      .post('/register')
      .set('Content-Type', 'application/json')
      .send({
        username: 'test1',
        email: 'test1@mail.com',
        password: '',
        phoneNumber: '+62456789012',
        address: 'Jl. Mawar',
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.message[0]).toMatch('password must be 5 character');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test('email sudah terdaftar, response 409', (done) => {
    request(app)
      .post('/register')
      .set('Content-Type', 'application/json')
      .send({
        username: 'dia',
        email: 'dia@mail.com',
        password: '123456',
        phoneNumber: '+62456789012',
        address: 'Jl. Mawar',
      })
      .expect(409)
      .then(({ body }) => {
        expect(body.message[0]).toMatch('Email is already used');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test('format email salah/ invalid, response 400', (done) => {
    request(app)
      .post('/register')
      .set('Content-Type', 'application/json')
      .send({
        username: 'dia',
        email: 'diamail.com',
        password: '123456',
        phoneNumber: '+62456789012',
        address: 'Jl. Mawar',
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.message[0]).toMatch('invalid format mail');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});
