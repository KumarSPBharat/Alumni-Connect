const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        phone: {
            type: String,
            trim: true,
        },

        college: {
            type: String,
            trim: true,
        },

        course: {
            type: String,
            trim: true,
        },

        graduationYear: {
            type: Number,
        },

        company: {
            type: String,
            trim: true,
        },

        bio: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Profile", profileSchema);