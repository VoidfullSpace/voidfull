export function getPackageVersion(): string {
  const packageJson = require("../package.json");
  return packageJson.version;
}
