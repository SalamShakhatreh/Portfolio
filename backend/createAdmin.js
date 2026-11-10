
require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./db");
const Admin = require("./models/Admin");

const createAdmin = async () => {
    try {
        await connectDB();

        const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

        if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
            throw new Error("Admin email and password are required");
        }

        const existingAdmin = await Admin.findOne({
            email: ADMIN_EMAIL
        });

        if (existingAdmin) {
            console.log("Admin already exists!");
            return;
        }

        await Admin.create({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
        });

        console.log("Admin created successfully!");

    } catch (error) {
        console.log("Error:", error.message);
        process.exitCode = 1;

    } finally {
        await mongoose.connection.close();
    }
};

createAdmin();
