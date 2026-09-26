const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");
const profileRoutes = require("./routes/profileRoutes");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

dns.setServers(["1.1.1.1"]);

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
    console.log("Request body:", req.body);
    next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Alumni Connect API is running!");
});

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });