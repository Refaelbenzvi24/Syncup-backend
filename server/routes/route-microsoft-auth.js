const express = require("express")
const router = express.Router()
const path = require("path")
import { MicrosoftToken } from "../../module/access toekn/microsoft-token.js"


/**
 * Microsoft access token route
 */
router.get("/", (req, res) => {
    // Declaring the Microsoft Side Class
    let MToken = new MicrosoftToken(req.query.code)
    res.sendFile(path.join(__dirname + "/../../public/close-window.html"))
    MToken.fetchAccessToken()
})

module.exports = router