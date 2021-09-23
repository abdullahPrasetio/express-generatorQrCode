const mongoose = require("mongoose");

const qrcodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  nameCustomer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Qrcode", qrcodeSchema);
