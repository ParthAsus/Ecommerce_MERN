import express from 'express';
import { authMiddleware, login, logout, signUp } from '../../controllers/auth/auth.controller.js';


const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logour', logout);
router.get('/check-auth', authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: 'Authenticated User!',
    user
  });
});


export default router;