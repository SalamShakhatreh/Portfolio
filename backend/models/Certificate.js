
const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        issuer: {
            type: String,
            required: true
        },

        issueDate: {
            type: String,
            required: true
        },

        file: {
            type: String,
            required: true
        },

        public_id: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Certificate", certificateSchema);
