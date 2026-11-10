
const express = require("express");
const router = express.Router();

const {
    login,
    verifyAdmin
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", login);

router.get("/verify", authMiddleware, verifyAdmin);

module.exports = router;
