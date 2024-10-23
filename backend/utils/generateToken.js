import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const generateToken = (res, userId, isAdmin = false) => {
  const payload = { userId, isAdmin };

  // const token = jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET, {
  //   expiresIn: '30d',
  // });

  // Sign the payload to generate the token
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '30d',
  });

  //set JWT as HTTP ONLY Cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
  });
};

export default generateToken;
