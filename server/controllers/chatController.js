let messages = [];

const addMessage = (msg) => {
  messages.push(msg);
  if (messages.length > 100) messages.shift(); // limit to 100
};

const getMessages = () => messages;

module.exports = {
  addMessage,
  getMessages,
};
