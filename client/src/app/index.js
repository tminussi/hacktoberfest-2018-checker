import "./index.css";
import jQuery from "jquery";
import i18next from "i18next";
import jqueryI18next from "jquery-i18next";
import i18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import i18nextXHRBackend from "i18next-xhr-backend";
import i18nextChainedBackend from "i18next-chained-backend";
import i18nextLocalStorageBackend from "i18next-localstorage-backend";
import Mustache from "mustache";

/** You need to add your language code and label here for the selector to work*/
const LOCALES_OPTIONS = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" }
].sort((localeA, localeB) => localeA.label.localeCompare(localeB.label));

($ => {
  i18next
    .use(i18nextChainedBackend)
    .use(i18nextBrowserLanguageDetector)
    .init(
      {
        fallbackLng: ["en"],
        ns: ["common"],
        defaultNS: "common",
        initImmediate: false,
        whitelist: ["en", "fr"],
        nonExplicitWhitelist: true,
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
              prefix: "i18next_",
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
      () => {
        let counter = 0;
        let prPercentage = 0;
        let intervalId;
        const isValid = username => {
          if (username.trim() === "") {
            alert($.t("alert_message"));
            return false;
          }
          return true;
        };

        const retrieveEndpoint = (username, lng) => ({
          url: `http://localhost:3000?username=${username}&lng=${lng}`,
          crossDomain: true
        });

        const setProgressPercentage = progress => {
          document.querySelector(".progress-bar>span").innerHTML =
            counter + "%";
          if (counter >= prPercentage) {
            clearInterval(intervalId);
          }
          counter++;
        };

        function selectLocale() {
          $("#locales option:selected").each(function() {
            const newLng = $(this).val();
            if (newLng) {
              console.log(newLng);
              $.i18n.changeLanguage($(this).val());
              location.reload();
            }
          });
        }

        $.when($.ready).then(() => {
          jqueryI18next.init(i18next, $);
          $(".container").localize();
          const loaderWrapperEl = document.getElementById("loader-wrapper");
          loaderWrapperEl.style.visibility = "hidden";

          const languageSelect = $("#selector-template").html();
          $("#language-selector").html(
            Mustache.render(languageSelect, {
              languageOpts: LOCALES_OPTIONS
            })
          );

          $("#locales").change(selectLocale);
          $("#language-selector").localize();

          //Keypress event for the username field
          $("#username").keypress(e => {
            //check if the user presses enter
            if (e.which == 13) {
              $("#do-req").click();
            }
          });
          $("#do-req").click(() => {
            let username = $("#username").val();
            if (!isValid(username)) {
              return;
            }

            const currentLng = $.i18n.language;
            $("#response").html("");
            const endpoint = retrieveEndpoint(username, currentLng);
            loaderWrapperEl.style.visibility = "visible";
            $.get(endpoint, response => {
              let index = 1;
              const template = $("#template").html();
              const responseData = {
                userPhoto: response.avatar,
                prCount: response.valid_pull_requests_amount + "/" + 5,
                prs: response.pull_requests ? response.pull_requests : [],
                message: response.message,
                index: function() {
                  return index++;
                },
                prState: function() {
                  const key = `pr_state.${this.state.toLowerCase()}`;
                  return $.t(key);
                }
              };
              prPercentage = (response.valid_pull_requests_amount / 5) * 100;
              if (prPercentage > 100) {
                prPercentage = 100;
              }
              responseData.prPercentage = prPercentage;
              loaderWrapperEl.style.visibility = "hidden";
              $("#response").html(Mustache.render(template, responseData));
              counter = 0;
              intervalId = setInterval(setProgressPercentage, 20);
              // Use i18n to update texts
              $(".response").localize();
            }).fail(error => {
              loaderWrapperEl.style.visibility = "hidden";
              const template = $("#template").html();
              const responseData = {
                userPhoto:
                  "https://image.ibb.co/grT6be/if_icon_7_sad_face_315580_6.png",
                message: $.t("Oops, something went wrong!")
              };
              $("#response").html(Mustache.render(template, responseData));
              $(".response").localize();
            });
          });
        });
      }
    );
})(jQuery);
