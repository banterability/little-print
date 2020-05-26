const https = require("https");
const VERSION = require("./package.json").version;

class LittlePrint {
  constructor({ appName, deviceKey }) {
    this.appName = appName || "LittlePrint";

    if (!deviceKey) throw new Error("deviceKey required");
    this.deviceKey = deviceKey;
  }

  printHTML(data) {
    this._makeRequest(data, "html");
  }

  printText(data) {
    this._makeRequest(data, "text");
  }

  _makeRequest(data, type) {
    const payload = { [type]: data };

    const body = JSON.stringify(payload);

    console.log(body);

    const options = {
      hostname: "device.li",
      port: 443,
      path: `/${this.deviceKey}?from=${encodeURIComponent(this.appName)}`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": body.length,
        "User-Agent": `little-print/v${VERSION}`,
      },
    };

    const req = https.request(options, (res) => {
      res.on("data", (d) => {
        process.stdout.write(d);
      });
    });

    req.on("error", (error) => {
      console.error(error);
    });

    req.write(body);
    req.end();
  }
}

module.exports = LittlePrint;
