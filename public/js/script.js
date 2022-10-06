let roomOrg = window.location.href.split("/");
let room = roomOrg[roomOrg.length - 1];
let url = roomOrg[2];
url.includes("www.") ? url.replace("www.", "") : "";

const socket = io(`ws://${url}:80`, {
  secure: true,
});
const sendContainer = document.getElementById("text_send");
const textInput = document.getElementById("text_input");
const connectInformation = document.getElementById("connect-information");

if (roomOrg.includes("chat")) {
  axios.get("/userInfo").then((u) => {
    socket.userData = u.data;
  });
}

if (roomOrg.includes("chat") && parseInt(room)) {
  socket.emit("joinRoom", {
    username: "User",
    room,
  });

  textInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") sendContainer.click();
  });

  sendContainer.addEventListener("click", async (e) => {
    e.preventDefault();

    const message = textInput.value;

    appenedMessage({ message }, "right");

    socket.emit("newMessage", {
      chat_id: room,
      sender_id: socket.userData.id,
      message,
    });
    socket.emit("messageCreate", {
      message,
      username: socket.userData.username,
      room,
    });

    textInput.value = "";
  });
}

socket.on("message", (data) => {
  appenedMessage(data, "left");
});

function appenedMessage(data, side) {
  var new_li = document.createElement("li");
  var new_div = document.createElement("div");
  var username_p = document.createElement("p");
  var message_p = document.createElement("p");
  var messages = document.getElementById("messages");

  new_li.className = "message";
  new_div.className = `sub-message ${side}-side`;
  username_p.className = "message-username";
  message_p.className = "message-message";

  messages.appendChild(new_li);
  new_li.appendChild(new_div);
  new_div.appendChild(username_p);
  new_div.appendChild(message_p);

  username_p.innerHTML = side == left ? data.username : "You";
  message_p.innerHTML = data.message;

  new_li.scrollIntoView();
}

const checkConnect = () => {
  const isSocketConnected = socket.connected;

  if (isSocketConnected) {
    connectInformation.className = "connected";
  } else {
    socket.connect();
    connectInformation.className = "disconnected";
  }
};

setTimeout(() => {
  checkConnect();
}, 500);

setInterval(() => {
  checkConnect();
}, 5000);
