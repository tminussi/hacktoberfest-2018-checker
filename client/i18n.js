($ =>
  $.when($.ready).then(() => {
    i18next.init(
      {
        lng: "en",
        resources: {
          en: {
            translation: {
              alert_messag: "Type something !",
              request_error: "Oops, something went wrong!",
              label: {
                username: "Username"
              },
              button: {
                "submit-req": "Submit"
              },
              th: {
                status: "Status",
                link: "Link"
              },
              img: {
                "profile-alt": "User photo"
              }
            }
          }
        }
      },
      function(err, t) {
        jqueryI18next.init(i18next, $);
        $(".container").localize();
      }
    );
  }))(jQuery);
