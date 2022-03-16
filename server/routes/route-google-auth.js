const express = require("express");
const router = express.Router();
const path = require("path");
import { GoogleToken } from "../../module/access toekn/google-token.js";

/**
 * Google access token route
 */
router.get("/", (req, res) => {
    // Declaring the Google Side Class
    let GToken = new GoogleToken(req.query.code);
    res.sendFile(path.join(__dirname + "/../../public/close-window.html"));
    GToken.fetchAccessToken();
});

module.exports = router;
