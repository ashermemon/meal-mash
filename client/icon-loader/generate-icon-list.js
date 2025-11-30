const fs = require("fs");
const mingcuteIcons = require("@iconify-json/mingcute/icons.json");
const allIconKeys = Object.keys(mingcuteIcons.icons);
fs.writeFileSync(
  "mingcute-icons-list.json",
  JSON.stringify(allIconKeys, null, 2)
);
