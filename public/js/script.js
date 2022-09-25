const socket = io();

socket.on("message", (data) => {
  var new_li = document.createElement("li");
  var new_div = document.createElement("div");
  var username_p = document.createElement("p");
  var message_p = document.createElement("p");
  var messages = document.getElementById("messages");

  new_li.className = "message";
  new_div.className = "sub-message left-side";
  username_p.className = "message-username";
  message_p.className = "message-message";

  messages.appendChild(new_li);
  new_li.appendChild(new_div);
  new_div.appendChild(username_p);
  new_div.appendChild(message_p);

  new_li.id = data.id;

  username_p.innerHTML = data.username;
  message_p.innerHTML = data.message;
});
