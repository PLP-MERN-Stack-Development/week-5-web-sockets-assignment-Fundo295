const { addUser, removeUser, getUsers, setTyping, getTypingUsers } = require('../controllers/usercontroller.js');
const { addMessage } = require('../controllers/chatController');
const formatMessage = require('../utils/FormatMessage');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('⚡ User connected:', socket.id);

    socket.on('user_join', (username) => {
      addUser(socket.id, username);
      io.emit('user_list', getUsers());
      io.emit('user_joined', { username, id: socket.id });
    });

    socket.on('send_message', ({ message }) => {
      const username = getUsers().find(u => u.id === socket.id)?.username || 'Anonymous';
      const msg = formatMessage(username, message);
      addMessage(msg);
      io.emit('receive_message', msg);
    });

    socket.on('private_message', ({ to, message }) => {
      const username = getUsers().find(u => u.id === socket.id)?.username;
      const msg = formatMessage(username, message, true);
      socket.to(to).emit('private_message', msg);
      socket.emit('private_message', msg);
    });

    socket.on('typing', (isTyping) => {
      const username = getUsers().find(u => u.id === socket.id)?.username;
      if (username) {
        setTyping(socket.id, username, isTyping);
        io.emit('typing_users', getTypingUsers());
      }
    });

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
      if (user) {
        io.emit('user_left', { username: user.username, id: socket.id });
        io.emit('user_list', getUsers());
        io.emit('typing_users', getTypingUsers());
      }
    });
  });
};
