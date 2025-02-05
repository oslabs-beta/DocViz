const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken"); // generates and verifies JWT tokens for authentication
const cookieParser = require("cookie-parser"); // allows reading and writing cookies in requests
require("dotenv").config(); // loads environment variables from a .env file for security

const router = express.Router(); 
router.use(cookieParser()); // enables cookie parsing for handling JWT tokens in cookies

// these are secret keys to  prevent storing sensitive data
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET; // git hub OAuth
const JWT_SECRET = process.env.JWT_SECRET; //stores tokens

// Redirect user to GitHub OAuth
router.get("/github", (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user:email`;
  res.redirect(githubAuthUrl);
});

// GitHub OAuth callback
router.get("/github/callback", async (req, res) => {
  const { code } = req.query;

  if (!code) return res.status(400).json({ error: "No code provided" });

  try {
    // Exchange code for access token
    const { data } = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } }
    );

    const accessToken = data.access_token;
    if (!accessToken) return res.status(400).json({ error: "No access token" });

    // Fetch user data from GitHub
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const user = userResponse.data;
    console.log("GitHub User:", user);

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.login },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Store token in HTTP-only cookie
    res.cookie("token", token, { httpOnly: true, secure: false });

    // Redirect to frontend
    res.redirect("http://localhost:3000/dashboard");
  } catch (error) {
    console.error("GitHub OAuth Error:", error);
    res.status(500).json({ error: "OAuth failed" });
  }
});

// Logout route
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

module.exports = router;
