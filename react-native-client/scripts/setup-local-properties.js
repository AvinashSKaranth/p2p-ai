const fs = require("fs");
const path = require("path");

const androidDir = path.join(__dirname, "..", "android");
const filePath = path.join(androidDir, "local.properties");
const content =
  "sdk.dir=C\\:\\\\Users\\\\Avina\\\\AppData\\\\Local\\\\Android\\\\Sdk\n";

if (!fs.existsSync(androidDir)) {
  fs.mkdirSync(androidDir, { recursive: true });
}

fs.writeFileSync(filePath, content);
console.log("Created android/local.properties");
