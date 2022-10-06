users.data = {};

users.userJoined = (userId, socketId, userData) => {
  userData["socketId"] = socketId;
  users.data[userId] = { userData };
  console.log(`User ${username} added with ${JSON.stringify(userData)}`);
  return true;
};

users.userLeaved = (userId) => {
  if (users.data[userId]) {
    delete users.data[userId];
    return true;
  }
  return false;
};

users.updateUser = (userId, key, newValue) => {
  if (users.data[userId] && users.data[userId][key]) {
    users.data[userId][key] = [newValue];
    return true;
  }
  return false;
};

users.getUserFromId = (userId) => {
  if (users.data[userId]) return users.data[userId];
  return null;
};

users.getUserFromSocketId = (socketId) => {
  const findUser = users.findOne((user) => user.socketId == socketId);
  if (findUser) return findUser;
  return null;
};

users.getUserFromUsername = (username) => {
  const findUser = users.findOne((user) => user.username == username);
  if (findUser) return findUser;
  return null;
};

module.exports = users;
