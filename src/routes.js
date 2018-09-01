import { Router } from 'express';
import { check } from 'express-validator/check';

import { UserController } from './controllers/user';

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
router.route('/users/login').post(
  [
    check('email')
      .isEmail()
      .withMessage('The email address is not a valid email.'),
    check('password')
      .isLength({ min: 5 })
      .withMessage('The password must be at least 5 chars long.'),
  ],
  userController.login
);
router.route('/users/register').post(userController.register);

router.route('/users').get(userController.loadAll);
router.route('/users/count').get(userController.count);
router.route('/users/:userId').get(userController.loadById);
router.route('/users/:userId').patch(userController.update);
router.route('/users/:userId').delete(userController.destroy);

export default router;
