const i18n = require("i18next");
const en = require("./resources/en.json");

// Initialize i18next Object and inject translations
i18n.init({
  lng: "en",
  resources: {
    en
  }
});

module.exports = i18n;
