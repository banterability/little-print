import { IncomingHttpHeaders } from "node:http";
import { request, RequestOptions } from "node:https";

export interface PrintResponse {
  statusCode: number;
  headers: IncomingHttpHeaders;
  body: string;
}

export async function makeRequest(
  options: RequestOptions,
  data: string | Buffer | Uint8Array,
): Promise<PrintResponse> {
  return new Promise<PrintResponse>((resolve, reject) => {
    const req = request(options, (res) => {
      let body = "";
      res.on("data", (chunk: Buffer) => (body += chunk.toString()));
      res.on("error", reject);
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode <= 299) {
          console.log("good response", res.statusCode, res.headers, body);
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body,
          });
        } else {
          console.log("bad response", res.statusCode, res.headers, body);
          reject(new Error(`request failed [${res.statusCode}]`));
        }
      });
    });

    req.on("error", reject);
    req.write(data, "binary");
    req.end();
  });
}
