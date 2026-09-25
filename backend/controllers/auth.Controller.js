const userModel = require("../models/user.Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
const signUpController = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;

    // 1. validate
    if (!firstName || !lastName || !userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "please enter all fields",
      });
    }

    // 2. check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }

    // 3. hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // 4. save user
    const user = new userModel({
      firstName,
      lastName,
      userName,
      email,
      password: hashPassword,
    });

    await user.save();

    // 5. generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 6. set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 7. response
    res.status(201).json({
      success: true,
      message: "user registred successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error signing up user",
    });
  }
};

// login
const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1.validate
    if (!email || !password) {
      return res.status(201).json({
        success: false,
        message: "please enter validate emaill or password",
      });
    }
    // 2.chekc user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not registerd",
      });
    }
    // 3.compoare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "invalidate email or password",
      });
    }
    // 4. generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 5. set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 6. response
    res.status(201).json({
      success: true,
      message: "user login successfully",
      user,
      token,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "please enter validate email or password",
    });
  }
};

//logout
const logoutUserController = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "logout successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error to logout",
    });
  }
};

module.exports = {
  signUpController,
  loginUserController,
  logoutUserController,
};
