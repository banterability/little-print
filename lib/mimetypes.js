const { extname } = require("node:path");

const MIME_TYPES = {
  png: "image/png",
  gif: "image/gif",
  jpg: "image/jpeg",
};

const EXTENTIONS = {
  ".gif": MIME_TYPES["gif"],
  ".jpg": MIME_TYPES["jpg"],
  ".jpeg": MIME_TYPES["jpg"],
  ".png": MIME_TYPES["png"],
};

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

module.exports = { getMimeType };
