const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
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
        picture
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
}

const loginUser = async (req, res) => {
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
}

module.exports = { registerUser, loginUser };