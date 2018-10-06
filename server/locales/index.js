const i18n = require("i18next");
const en = require("./en/server.json");
/*
  Initialize i18next Object and inject translations
  You can add your own language in resources and whitelist
*/
i18n.init({
  defaultNS: "common",
  fallbackLng: "en",
  whitelist: ["en"],
  nonExplicitWhitelist: true,
  resources: {
    en,
    fr
  }
});

module.exports = i18n;
