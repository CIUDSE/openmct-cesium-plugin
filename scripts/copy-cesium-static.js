// NodeJS script to copy Cesium static files to the dist folder

const fs = require("fs-extra");
const path = require("path");

const cesiumPath = path.join(
  __dirname,
  "..",
  "node_modules",
  "cesium",
  "Build",
  "Cesium",
);
const distPath = path.join(__dirname, "..", "dev", "cesiumStatic");

// Create the dist folder if it doesn't exist + parent folders
fs.mkdirSync(distPath, { recursive: true });

fs.copySync(path.join(cesiumPath, "Workers"), path.join(distPath, "Workers"));
fs.copySync(
  path.join(cesiumPath, "ThirdParty"),
  path.join(distPath, "ThirdParty"),
);
fs.copySync(path.join(cesiumPath, "Assets"), path.join(distPath, "Assets"));
fs.copySync(path.join(cesiumPath, "Widgets"), path.join(distPath, "Widgets"));
