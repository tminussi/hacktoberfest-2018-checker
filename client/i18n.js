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
          jqueryI18next.init(i18next, $);
          // Get elements to translate
          $(".container").localize();
        }
      );
  }))(jQuery);
