const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blaclisttokenmodel = require("../models/blacklist.model");

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide username, email and password",
            });
        }

        const isUserExists = await userModel.findOne({
            $or: [{ username }, { email }],
        });

        if (isUserExists) {
            return res.status(400).json({
                message: "Account with this username or email already exists !",
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hash,
        });

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            // In development (http) we cannot use secure cookies; set based on environment
            secure: process.env.NODE_ENV !== "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            message: "User registered !",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({
            message: error.name === "MongooseServerSelectionError"
                ? "Database connection failed. Please ensure your IP address is whitelisted in MongoDB Atlas."
                : error.message || "Failed to register user",
        });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password",
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials !",
            });
        }

        const isPasswordvalid = await bcrypt.compare(password, user.password);

        if (!isPasswordvalid) {
            return res.status(400).json({
                message: "Invalid email or password !",
            });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            // Adjust for development environment
            secure: process.env.NODE_ENV !== "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "User login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            message: error.name === "MongooseServerSelectionError"
                ? "Database connection failed. Please ensure your IP address is whitelisted in MongoDB Atlas."
                : error.message || "Failed to log in",
        });
    }
}

async function logoutUser(req, res) {
    try {
        const token = req.cookies.token;

        if (token) {
            await blaclisttokenmodel.create({ token });
        }

        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });

        res.status(200).json({
            message: "User logged out ",
        });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({
            message: "Error logging out",
        });
    }
}

async function getUser(req, res) {
    try {
        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(440).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User fetched",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("GetUser Error:", error);
        res.status(500).json({
            message: "Failed to fetch user details",
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
};