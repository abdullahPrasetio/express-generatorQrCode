const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
router.get("/qr-code", apiController.getQr);
module.exports = router;
