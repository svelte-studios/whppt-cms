const fs = require("fs");

const packageFile = JSON.parse(fs.readFileSync("./package.json"));
delete packageFile.devDependencies;
delete packageFile.ava;
delete packageFile.scripts;
fs.writeFileSync(".build/package.json", JSON.stringify(packageFile, null, 2));
