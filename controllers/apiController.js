const Qrcode = require("../models/Qrcode");
module.exports = {
  getQr: async (req, res) => {
    const { code } = req.query;
    const qrcode = await Qrcode.findOne({ code: code });
    if (!qrcode) {
      return res.status(404).json({
        status: "Error",
        message: "Not Found",
      });
    }
    return res.status(200).json({
      status: "Success",
      data: qrcode,
    });
  },
};
