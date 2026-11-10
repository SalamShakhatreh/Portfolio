const express = require("express");
const router = express.Router();

const {
    getCertificates,
    addCertificate,
    updateCertificate,
    deleteCertificate
} = require("../controllers/certificateController");

const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getCertificates);

router.post("/", authMiddleware, upload.single("file"), addCertificate);

router.put("/:id", authMiddleware, upload.single("file"), updateCertificate);

router.delete("/:id", authMiddleware, deleteCertificate);

module.exports = router;