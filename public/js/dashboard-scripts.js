var messages = document.getElementsByClassName("message");
if (messages[1]) {
  var target = document.getElementById(messages[messages.length - 1].id);
  target.scrollIntoView();
}

var encryptBtn = document.getElementById("encryptMsgBtn");
var passwordInp = document.getElementById("passInp");
encryptBtn.addEventListener("click", () => {
  encryptBtn.checked
    ? (passwordInp.style.display = "inline-block")
    : (passwordInp.style.display = "none");
});
