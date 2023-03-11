import { readFileSync } from "node:fs";
import https from "node:https";
import { getMimeType } from "./lib/mimeType.js";

const VERSION = "2.0.0";

export default class LittlePrint {
  constructor({ appName, deviceKey }) {
    this.appName = appName || "little-print";

    if (!deviceKey) throw new Error("deviceKey required");
    this.deviceKey = deviceKey;
  }

  printHTML(data) {
    this._jsonRequest(data, "html");
  }

  printText(data) {
    this._jsonRequest(data, "text");
  }

  printImage(path) {
    this._imageRequest(path);
  }

  _imageRequest(path) {
    const mimetype = getMimeType(path);
    const imageData = readFileSync(path);
    this._makeRequest(imageData, mimetype);
  }

  _jsonRequest(data, type) {
    const payload = { [type]: data };
    const body = JSON.stringify(payload);
    this._makeRequest(body, "application/json");
  }

  _makeRequest(body, contentType) {
    const query = new URLSearchParams();
    query.set("from", this.appName);

    const options = {
      hostname: "device.li",
      port: 443,
      path: `/${this.deviceKey}?${query.toString()}`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Length": body.length,
        "Content-Type": contentType,
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
