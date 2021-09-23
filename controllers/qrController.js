const rs = require("randomstring");
const QRCode = require("qrcode");
const Qrcode = require("../models/Qrcode");
const { default: axios } = require("axios");

module.exports = {
  generateQr: async (req, res) => {
    const url = req.body.url;
    const nameCustomer = req.body.customer;
    if (url.length === 0) res.send("Empty Data!");
    let arr2 = [];
    let images = [];
    for (let i = 0; i < url; i++) {
      let ransom = rs.generate({
        length: 16,
        capitalization: "uppercase",
      });
      arr2[i] = ransom;
      await QRCode.toDataURL(ransom)
        .then(async (url) => {
          images.push(url);
          await Qrcode.create({
            code: ransom,
            nameCustomer: nameCustomer,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
    axios({
      url: "http://127.0.0.1:8000/api/v1/hardware/create/asset-tag",
      method: "post",
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiOGVjMDk0NmJlYzZmYjI0ZWUxYWY5MGE0NTAxYzRlZmU0ZTdmMjI3YmI3MDE3ZDQ3ZjVlZjJkNDcxZWM2MzkxNmM5ZTY4NDRmMDUzOGRkMmMiLCJpYXQiOjE2MzIyMTg1MDcsIm5iZiI6MTYzMjIxODUwNywiZXhwIjoyMTA1NjA0MTA3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.pP4bM5J3oUjmR-6PYdpTBt7uiLY1IN74nDtWIts69TaulnmlLRLGFqaEuiPznFQRvjSOxyk2FzeuGjo8xwA2b7AJUGWIOcAhqzDauyqfD9OUE-Rqn5oG_cOP0Ru61UDgfIsTzgfrp9GKsEJ3H0n2dHV-XBDNG3h7AHIKFwU0uRZK1e4JvpNSYB3WJzQEGfykDp6Lcm5sXYi5GX2F2ZGDUfSMDNfHh_T5-GKuDX-WxTlYTFRXUWcraLnzicmWf76HvkwpHaxz4EUjQWdtUEM4sboH-iRJ_wgHZrHPOBcz1xa0AMkec2iQRMKc0L7UTeBe1tj5RGrXllum4xZGQbyVi6aZ4BTo1BV8BtUVay2UR-N5wueWhN-NhSGQM_n6EP9RSk9XtRcCcu1uiR0hVeW3lJnt9ht4L3ZsqW7K93eGBk-UqrhmG7Uv2O5--H2wIjmjOv0e6FV-rNL_N4oMB7rsQIRJVw0MXlg-_Cj0EK7uaMYuSOutny3J1iCPksJv4hS7ahwxbpSsXCxc2z7kPdtn59Zb0f5_IP0CQC0ESneY3NT91CbHFPAiUmMorA8t-qbDcLxhpXbtvB-qyCaOsI2l9LzgTx0i14J1086xWUWf8D9T5MNGTo6qAMHHEuzFuYLlAtGA4CW51B2f3LxNiGsbhpWDXeHDu6Tt0jdWqAHMspQ",
      },
      data: {
        code: arr2,
      },
    });
    res.render("scan", { images, texts: arr2, nameCustomer });
  },
};
