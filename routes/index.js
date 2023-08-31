const router = require('express').Router();
const adminControllers = require('../controllers/admin');
const authenticationMiddleware = require('../middlewares/authentication');
// const authorizatioAdmin = require('../middlewares/authorization-admin');
const authorizationMiddleware = require('../middlewares/authorization-admin');
const errorHandler = require('../middlewares/errorHandler');

router.post('/register', adminControllers.register);
router.post('/sign-in', adminControllers.signIn);

router.use(authenticationMiddleware);
router.get('/movies', adminControllers.getMovies);
router.post('/movies', adminControllers.postMovie);
router.get('/movies/:id', adminControllers.getMovie);
router.put('/movies/:id', authorizationMiddleware, adminControllers.updatedMovies);
router.delete('/movies/:id', authorizationMiddleware, adminControllers.deleteMovie);
router.patch('/movies/:id', authorizationMiddleware, adminControllers.updateMovie);

router.use(errorHandler);

module.exports = router;
