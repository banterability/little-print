import { readFileSync } from "node:fs";
import { getMimeType } from "./mimeType.js";
import { makeRequest } from "./request.js";

const VERSION = "2.0.0";

export default class LittlePrint {
  appName: string;
  deviceKey: string;

  constructor({ appName, deviceKey }: { appName?: string; deviceKey: string }) {
    this.appName = appName || "little-print";

    if (!deviceKey) throw new Error("deviceKey required");
    this.deviceKey = deviceKey;
  }

  async printHTML(data: string) {
    return await this._jsonRequest(data, "html");
  }

  async printText(data: string) {
    return await this._jsonRequest(data, "text");
  }

  async printImage(path: string) {
    return await this._imageRequest(path);
  }

  async _imageRequest(path: string) {
    const mimetype = getMimeType(path);
    const imageData = readFileSync(path);
    return await this._makeRequest(imageData, mimetype);
  }

  async _jsonRequest(data: string, type: "html" | "text") {
    const payload = { [type]: data };
    const body = JSON.stringify(payload);
    return await this._makeRequest(body, "application/json");
  }

  async _makeRequest(data: string | Buffer, contentType: string) {
    const query = new URLSearchParams();
    query.set("from", this.appName);

    const options = {
      hostname: "device.li",
      port: 443,
      path: `/${this.deviceKey}?${query.toString()}`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Length": data.length,
        "Content-Type": contentType,
        "User-Agent": `little-print/v${VERSION}`,
      },
    };

    return await makeRequest(options, data);
  }
}
