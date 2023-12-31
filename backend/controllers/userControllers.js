const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, picture } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      console.log("Please enter all fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      picture,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Failed to create the user");
    }
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user && isPasswordValid) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  } catch (err) {
    next(err);
  }
};

const getAllUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search ? {
    $or: [
      {
        name: { $regex: req.query.search, $options: "i" }
      },
      {
        email: { $regex: req.query.search, $options: "i" }
      }
    ]
  } : {};

  const users = await User.find(keyword).find({ _id: { $ne:req.user._id } });
  res.send(users);
})

module.exports = { registerUser, loginUser, getAllUsers };
