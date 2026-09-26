const express = require("express");

const {
    createProfile,
    getProfile,
    updateProfile,
    getAllProfiles,
} = require("../controllers/profileController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createProfile);

router.get("/", protect, getProfile);

router.put("/", protect, updateProfile);

router.get("/all", protect, getAllProfiles);

module.exports = router;