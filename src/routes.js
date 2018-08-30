import { Router } from 'express';

/**
 * Contains all API routes for the application.
 */
const router = Router();

router.route('/').get((req, res) => {
  res.json({
    status: 'OK',
  });
});

export default router;
