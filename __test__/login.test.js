const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models/index');
const { queryInterface } = sequelize;
const { hashingPassword } = require('../helpers/bcrypt-helpers');
const { verify } = require('../helpers/jwt-helpers');

let input = [
  {
    email: 'rahayu@mail.com',
    password: hashingPassword('123456'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

beforeAll(async () => {
  await queryInterface.bulkDelete('Users', input, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await queryInterface.bulkInsert('Users', input, {});
});

describe('testing endpoint login', () => {
  test('berhasil login, response 200', (done) => {
    const data = {
      email: 'rahayu@mail.com',
      password: '123456',
    };
    request(app)
      .post('/sign-in')
      .set('Content-Type', 'application/json')
      .send(data)
      .expect(200)
      .then(({ body }) => {
        const verifyToken = verify(body.access_token);
        expect(verifyToken).toMatchObject({ id: 1, email: data.email });
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test('memberikan password yang salah, response 401', (done) => {
    const data = {
      email: 'rahayu@mail.com',
      password: 'lalal',
    };
    request(app)
      .post('/sign-in')
      .set('Content-Type', 'application/json')
      .send(data)
      .expect(401)
      .then(({ body }) => {
        expect(body.message).toMatch('Invalid Password');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  test('email yang diinput tidak terdaftar di database, response 401', (done) => {
    const data = {
      email: 'adi@mail.com',
      password: 'budi123',
    };
    request(app)
      .post('/sign-in')
      .set('Content-Type', 'application/json')
      .send(data)
      .expect(401)
      .then(({ body }) => {
        expect(body.message).toMatch('Email or Password Not Found');
        done();
      })
      .catch((error) => {
        done(error);
        console.log(error);
      });
  });
});
