import i18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import i18nextXHRBackend from "i18next-xhr-backend";
import i18nextChainedBackend from "i18next-chained-backend";
import i18nextLocalStorageBackend from "i18next-localstorage-backend";

($ =>
  $.when($.ready).then(() => {
    // Initialize i18next Object
    i18next
      .use(i18nextChainedBackend)
      .use(i18nextBrowserLanguageDetector)
      .init(
        {
          fallbackLng: "en",
          ns: ["common"],
          defaultNS: "common",
          initImmediate: false,
          detection: {
            order: ["querystring", "localStorage", "navigator"],
            lookupQuerystring: "lng",
            lookupLocalStorage: "i18nextLng",
            caches: ["localStorage"]
          },
          backend: {
            backends: [i18nextLocalStorageBackend, i18nextXHRBackend],
            backendOptions: [
              {
                prefix: "i18next_res_",
                expirationTime: 7 * 24 * 60 * 60 * 1000
              },
              {
                loadPath: "http://localhost:3000/locale/{{lng}}",
                crossDomain: true,
                parse: data => {
                  return JSON.parse(data);
                }
              }
            ]
          }
        },
        function(err, t) {
          //jqueryI18next.init(i18next, $);
          // Get elements to translate
          $(".container").localize();
        }
      );
  }))(jQuery);
