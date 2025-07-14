let users = {};
let typingUsers = {};

const addUser = (id, username) => {
  users[id] = { username, id };
};

const removeUser = (id) => {
  const user = users[id];
  delete users[id];
  delete typingUsers[id];
  return user;
};

const getUsers = () => Object.values(users);
const setTyping = (id, username, isTyping) => {
  if (isTyping) typingUsers[id] = username;
  else delete typingUsers[id];
};
const getTypingUsers = () => Object.values(typingUsers);

module.exports = {
  addUser,
  removeUser,
  getUsers,
  setTyping,
  getTypingUsers,
};
