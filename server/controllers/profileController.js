const Profile = require("../models/Profile");

const createProfile = async (req, res) => {
    try {
        const {
            phone,
            college,
            course,
            graduationYear,
            company,
            bio,
        } = req.body;

        const existingProfile = await Profile.findOne({
            user: req.userId,
        });

        if (existingProfile) {
            return res.status(400).json({
                message: "Profile already exists",
            });
        }

        const profile = await Profile.create({
            user: req.userId,
            phone,
            college,
            course,
            graduationYear,
            company,
            bio,
        });

        res.status(201).json({
            message: "Profile created successfully",
            profile,
        });
    } catch (error) {
        console.error("Profile creation error:", error.message);

        res.status(500).json({
            message: "Server error",
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.userId,
        });

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found",
            });
        }

        res.status(200).json({
            profile,
        });
    } catch (error) {
        console.error("Get profile error:", error.message);

        res.status(500).json({
            message: "Server error",
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findOneAndUpdate(
            { user: req.userId },
            req.body,
            { new: true }
        );

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found",
            });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            profile,
        });
    } catch (error) {
        console.error("Update profile error:", error.message);

        res.status(500).json({
            message: "Server error",
        });
    }
};

const getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find()
            .populate("user", "name email role");

        res.status(200).json({
            profiles,
        });
    } catch (error) {
        console.error("Get all profiles error:", error.message);

        res.status(500).json({
            message: "Server error",
        });
    }
};

module.exports = {
    createProfile,
    getProfile,
    updateProfile,
    getAllProfiles,
};