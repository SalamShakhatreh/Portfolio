
const Certificate = require("../models/Certificate");
const cloudinary = require("../config/cloudinary");

const getCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find().sort({ createdAt: -1 });

        res.status(200).json(certificates);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch certificates"
        });
    }
};

const addCertificate = async (req, res) => {
    try {
        const { title, issuer, issueDate } = req.body;

        if (!title || !issuer || !issueDate || !req.file) {
            return res.status(400).json({
                message: "Please fill in all fields and upload a certificate"
            });
        }

        const certificate = await Certificate.create({
            title,
            issuer,
            issueDate,
            file: req.file.path,
            public_id: req.file.filename
        });

        res.status(201).json({
            message: "Certificate added successfully",
            certificate
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to add certificate"
        });
    }
};

const updateCertificate = async (req, res) => {
    try {
        const { title, issuer, issueDate } = req.body;

        const certificate = await Certificate.findById(req.params.id);

        if (!certificate) {
            if (req.file) {
                await cloudinary.uploader.destroy(req.file.filename);
            }

            return res.status(404).json({
                message: "Certificate not found"
            });
        }

        certificate.title = title || certificate.title;
        certificate.issuer = issuer || certificate.issuer;
        certificate.issueDate = issueDate || certificate.issueDate;

        if (req.file) {
            if (certificate.public_id) {
                await cloudinary.uploader.destroy(certificate.public_id);
            }

            certificate.file = req.file.path;
            certificate.public_id = req.file.filename;
        }

        await certificate.save();

        res.status(200).json({
            message: "Certificate updated successfully",
            certificate
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update certificate"
        });
    }
};

const deleteCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);

        if (!certificate) {
            return res.status(404).json({
                message: "Certificate not found"
            });
        }

        if (certificate.public_id) {
            await cloudinary.uploader.destroy(certificate.public_id);
        }

        await Certificate.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Certificate deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete certificate"
        });
    }
};

module.exports = {
    getCertificates,
    addCertificate,
    updateCertificate,
    deleteCertificate
};
