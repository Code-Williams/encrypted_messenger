if (document.baseURI.includes("/chat/")) {
  var messages = document.getElementsByClassName("message");
  if (messages[1]) {
    var target = document.getElementById(messages[messages.length - 1].id);
    target.scrollIntoView();
  }
}

var leftMenu = document.getElementById("left");
var hamburger = document.getElementById("hamburger-chat");
if (hamburger) {
  hamburger.addEventListener("click", () => {
    leftMenu.style.width = "70%";
    hamburger.style.display = "none";
  });
}

var closeMenu = document.getElementById("close-menu");
if (closeMenu) {
  closeMenu.addEventListener("click", () => {
    leftMenu.style.width = "0";
    hamburger.style.display = "block";
  });
}

if (document.baseURI.endsWith("/new")) {
  var encryptBtn = document.getElementById("encryptMsgBtn");
  var passwordInp = document.getElementById("passInp");
  encryptBtn.addEventListener("click", () => {
    encryptBtn.checked
      ? (passwordInp.style.display = "inline-block")
      : (passwordInp.style.display = "none");
  });
}

// document.addEventListener("contextmenu", (event) => {
//   event.preventDefault();
// });

// Save device on first login and save it for later.
// var userData = navigator.userAgent;
// console.log(userData);

// Notification.requestPermission().then(() => {
//   var myNotif = new Notification("Header", {
//     body: "Body",
//     icon: "icon url",
//   });
// });
