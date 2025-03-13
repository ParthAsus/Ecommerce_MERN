import { generateCookieToken } from "../../lib/generateToken.js";
import User from "../../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Signup
export const signUp = async(req, res) => {
  const {userName, email, password} = req.body;

  try {
    if(!userName || !email || !password) return res.status(400).json({message: 'All field are required'});


    const existingUser = await User.findOne({email: email});
    if(existingUser){
      return res.status(400).json({message: "Email already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword
    });

    if(newUser){
      await newUser.save();

      return res.status(200).json({
        success: true,
        message: "SignUp Successfully"
      });
    }else{
      return res.status(400).json({message: 'Invalid user data'});
    }
  } catch (error) {
    console.log('Error in auth/SignUp controller', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server error'});
  }
};

// login
export const login = async(req, res) => {
  const {email, password} = req.body;
  try {
    if(!email || !password){
      return res.status(400).json({message: 'All field are required'});
    };

    const existingUser = await User.findOne({email: email});
    if(!existingUser){
      return res.status(400).json({message: "Unable to find account"});
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordCorrect){
      return res.status(400).json({message: 'Invalid email or password'});
    }else{
      generateCookieToken(existingUser.role, existingUser.email, existingUser.password, res);
      res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        user: {
          id: existingUser._id,
          userName: existingUser.userName,
          email: existingUser.email,
          role: existingUser.role,
          crearedAt: existingUser.crearedAt
        },
      });
    };
  } catch (error) {
    console.log('Error in auth/login controller', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server error'});
  }
};

// logout
export const logout = async(req, res) => {
  try {
    res.clearCookie('auth_jwt').json({
      success: true, 
      message: 'Logged out successfully',
    }); 
  } catch (error) {
    console.log('Error in auth/logout controller', error);
    res.status(400).json({
      success: false,
      message: 'Unable to logged out'
    });
  }
};

// auth middleware

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.auth_jwt;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized User!'
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.COOKIE_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('Error in authMiddleware');
    res.status(401).json({
      success: false,
      message: 'Unauthorised User!'
    });
  }
};


