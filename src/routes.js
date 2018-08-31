import {Router} from 'express';
import {UserController} from './controllers/user';

/**
 * Contains all API routes for the application.
 */
const router = Router();
const userController = new UserController();

router.route('/').get((req, res) => {
  res.json({
    status: 'OK',
  });
});

router.route('/users/me').post(userController.me);
router.route('/users/login').post(userController.login);
router.route('/user/register').post(userController.register);

router.route('/users').get(userController.loadAll);
router.route('/users/count').get(userController.count);
router.route('/users/{:userId}').patch(userController.update);
router.route('/users/{:userId}').post(userController.loadById);
router.route('/users/{:userId}').delete(userController.destroy);

export default router;
