const fs = require("fs");
const mingcuteIcons = require("@iconify-json/mingcute/icons.json");

const allIconKeys = Object.keys(mingcuteIcons.icons);

console.log(allIconKeys.slice(0, 50));
console.log("Total icons:", allIconKeys.length);

fs.writeFileSync(
  "mingcute-icons-list.json",
  JSON.stringify(allIconKeys, null, 2)
);

console.log("Saved all icon names to mingcute-icons-list.json");
