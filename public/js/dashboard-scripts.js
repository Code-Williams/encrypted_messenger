if (document.baseURI.includes("/chat/")) {
  var messages = document.getElementsByClassName("message");
  if (messages[1]) {
    var target = document.getElementById(messages[messages.length - 1].id);
    target.scrollIntoView();
  }
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

try {
  navigator.getBattery().then((battery) => {
    var lvl = battery.level * 100;
    if (lvl <= 20) {
      var notif = document.getElementById("notif");
      notif.innerHTML = "Low Battery";
      notif.style.color = "rgb(240, 69, 69)";
    }
  });
} catch (error) {}

// Notification.requestPermission().then(() => {
//   var myNotif = new Notification("Header", {
//     body: "Body",
//     icon: "icon url",
//   });
// });

var loadingPage = document.getElementById("outer");
window.addEventListener("load", () => {
  loadingPage.style.display = "none";
});
