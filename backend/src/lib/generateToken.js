import jwt from 'jsonwebtoken';

export const generateCookieToken = async (role, email, userName, res) => {
  try {
    const token = jwt.sign(
      {role: role, email: email, userName: userName},
      process.env.COOKIE_SECRET,
      {
        expiresIn: '7d',
      },
    );

    res.cookie('auth_jwt', token, {
      maxAge: 7 * 24 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== 'development',
    });
  } catch (error) {
    console.log('Error in generateCookieToken', error);
    res.status(400).json({message: 'unabel to generate auth cookie token'});
  }
};