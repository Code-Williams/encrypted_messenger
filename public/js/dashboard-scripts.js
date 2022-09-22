var messages = document.getElementsByClassName("message");
if (messages[1]) {
  var target = document.getElementById(messages[messages.length - 1].id);
  target.scrollIntoView();
}
