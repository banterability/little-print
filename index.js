import { readFileSync } from "node:fs";
import https from "node:https";
import { extname } from "node:path";

const VERSION = "2.0.0";

const MIME_TYPES = Object.freeze({
  png: "image/png",
  gif: "image/gif",
  jpg: "image/jpeg",
});

const EXTENTIONS = Object.freeze({
  ".gif": MIME_TYPES["gif"],
  ".jpg": MIME_TYPES["jpg"],
  ".jpeg": MIME_TYPES["jpg"],
  ".png": MIME_TYPES["png"],
});

function getMimeType(path) {
  const extention = extname(path);
  const mimeType = EXTENTIONS[extention];
  console.log({ extention, mimeType });
  if (!mimeType) {
    throw new Error(
      `Unsupported file type. Expected one of [${Object.values(MIME_TYPES).join(
        ", "
      )}]`
    );
  }
  return mimeType;
}

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
    const options = {
      hostname: "device.li",
      port: 443,
      path: `/${this.deviceKey}?from=${encodeURIComponent(this.appName)}`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": contentType,
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
