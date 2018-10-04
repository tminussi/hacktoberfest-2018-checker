const i18n = require("i18next");
const en = require("./en/server.json");

// Initialize i18next Object and inject translations
i18n.init({
  lng: "en",
  defaultNS: "common",
  fallbackLng: "en",
  resources: {
    en
  }
});

module.exports = i18n;
