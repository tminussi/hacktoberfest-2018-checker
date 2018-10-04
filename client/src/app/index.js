import './index.css';

($ => {
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

  const retrieveEndpoint = username => ({
    url: `http://localhost:3000?username=${username}`,
    crossDomain: true
  });

  const setProgressPercentage = progress => {
    document.querySelector(".progress-bar>span").innerHTML = counter + "%";
    if (counter >= prPercentage) {
      clearInterval(intervalId);
    }
    counter++;
  };

  $.when($.ready).then(() => {
    const loaderWrapperEl = document.getElementById("loader-wrapper");
    loaderWrapperEl.style.visibility = "hidden";
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

      $("#response").html("");
      const endpoint = retrieveEndpoint(username);
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
          message: $.t("request-error")
        };
        $("#response").html(Mustache.render(template, responseData));
        $(".response").localize();
      });
    });
  });
})(jQuery);
