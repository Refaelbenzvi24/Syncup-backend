const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

router.use("/user/email/exist", require("./routes/Accounts/check-email"));

module.exports = router;
