const encryptCheckBox = document.getElementById("encryptMsgBtn");
const encryptPassword = document.getElementById("passInp");
const isNewChatPage = window.location.href.endsWith("/chat/new");

if (isNewChatPage) {
  encryptCheckBox.addEventListener("click", (e) => {
    if (encryptCheckBox.checked) {
      encryptPassword.required = true;
    } else {
      encryptPassword.required = false;
    }
  });
}
