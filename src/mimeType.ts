import { extname } from "node:path";

interface StringMap {
  [key: string]: string;
}

const MIME_TYPES: StringMap = Object.freeze({
  png: "image/png",
  gif: "image/gif",
  jpg: "image/jpeg",
});

const EXTENTIONS: StringMap = Object.freeze({
  ".gif": MIME_TYPES["gif"],
  ".jpg": MIME_TYPES["jpg"],
  ".jpeg": MIME_TYPES["jpg"],
  ".png": MIME_TYPES["png"],
});

export function getMimeType(path: string) {
  const extention = extname(path);
  const mimeType = EXTENTIONS[extention];

  if (!mimeType) {
    throw new Error(
      `Unsupported file type. Expected one of [${Object.values(MIME_TYPES).join(
        ", "
      )}]`
    );
  }
  return mimeType;
}
