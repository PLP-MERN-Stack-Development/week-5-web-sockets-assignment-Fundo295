const formatMessage = (username, message, isPrivate = false) => ({
  id: Date.now(),
  sender: username,
  message,
  isPrivate,
  timestamp: new Date().toISOString(),
});

module.exports = formatMessage;
