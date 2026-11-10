
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const admin = await Admin.findOne({
    email: email.trim().toLowerCase()
});

        if (!admin) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await admin.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};
const verifyAdmin = async (req, res) => {
    try {
        res.status(200).json({
            message: "Admin authenticated",
            admin: {
                id: req.admin._id,
                email: req.admin.email
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = { login, verifyAdmin };


