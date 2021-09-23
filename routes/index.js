const express = require("express");
const router = express.Router();
const qrController = require("../controllers/qrController");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/", qrController.generateQr);

module.exports = router;
