const socket = io("ws://localhost:80", {
  transports: ["websocket"],
  secure: true,
});
const sendContainer = document.getElementById("text_send");
const textInput = document.getElementById("text_input");
let roomOrg = window.location.href.split("/");
let room = roomOrg[roomOrg.length - 1];

if (roomOrg.includes("chat")) {
  socket.emit("joinRoom", {
    username: "User",
    room,
  });
}

textInput.addEventListener("keypress", (e) => {
  if (e.key == "Enter") sendContainer.click();
});

sendContainer.addEventListener("click", async (e) => {
  e.preventDefault();

  const message = textInput.value;

  await axios.get("/userInfo").then((u) => {
    axios
      .post("/newMessage", {
        chat_id: room,
        sender_id: u.data.id,
      })
      .then((msg) => {
        appenedMessage({ id: msg.data.id, message }, "right");

        socket.emit("updateMessage", { id: msg.data.id, message });
        socket.emit("messageCreate", {
          message,
          id: msg.data.id,
          username: u.data.username,
          room,
        });
      });
  });

  textInput.value = "";
});

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

  new_li.id = data.id;

  username_p.innerHTML = "You";
  message_p.innerHTML = data.message;

  new_li.scrollIntoView();
}
