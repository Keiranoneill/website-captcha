var isAllowedToSend = true;

document
  .querySelector("#chat-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    if (!isAllowedToSend) {
      document.getElementById("error-message").textContent =
        "Please wait 10 seconds before sending another message.";
      return; // exit if not allowed to send
    }

    var message = document.querySelector("#chat-message").value;
    var output = document.querySelector("#output");
    var previousMessages = output.innerHTML;
    output.innerHTML = previousMessages + "<p>" + message + "</p>";
    document.querySelector("#chat-message").value = ""; // clear the input field
    document.getElementById("error-message").textContent = ""; // clear the error message

    // Disable sending messages for 10 seconds
    isAllowedToSend = false;
    setTimeout(function () {
      isAllowedToSend = true;
    }, 10000);
  });
