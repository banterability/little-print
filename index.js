const debug = require("debug")("little-print");
const https = require("https");
const VERSION = require("./package.json").version;

class LittlePrint {
  constructor({appName, deviceKey}) {
    this.appName = appName || 'LittlePrint';

    if (!deviceKey) throw new Error("deviceKey required");

    this.deviceKey = deviceKey;
  }

  html(data) {
    this._makeRequest(data, "html");
  }

  text(data) {
    this._makeRequest(data, "text");
  }

  _makeRequest(data, type) {
    const payload = { [type]: data };

    const body = JSON.stringify(payload);

    debug('payload', body);

    const options = {
      hostname: "device.li",
      port: 443,
      path: `/${this.deviceKey}?from=${encodeURIComponent(this.appName)}`,
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Content-Length": body.length,
        "User-Agent": `little-print/v${VERSION}`
      }
    };

    debug('options', options);

    const req = https.request(options, res => {
      debug(`status: ${res.statusCode}`);

      res.on("data", d => {
        debug('on data');
        process.stdout.write(d);
      });
    });

    req.on("error", error => {
      debug('on error');
      console.error(error);
    });

    req.write(body);
    req.end();
    debug('end');
  }
}

module.exports = LittlePrint;
