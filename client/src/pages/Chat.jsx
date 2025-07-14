import MessageList from '../components/MessageList';
import UserList from '../components/UserList';
import ChatInput from '../components/ChatInput';
import TypingIndicator from '../components/TypingIndicator';
import { useSocket } from '../socket/socket';
import { useUser } from '../context/UserContext';
import { useEffect } from 'react';

const Chat = () => {
  const { username } = useUser();
  const {
    connect,
    disconnect,
    messages,
    users,
    typingUsers,
    sendMessage,
    setTyping,
  } = useSocket();

  useEffect(() => {
    if (username) connect(username);
    return () => disconnect();
  }, [username]);

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
        <h2 className="font-bold text-lg mb-2">Users Online</h2>
        <UserList users={users} />
      </aside>
      <main className="flex-1 flex flex-col bg-gray-50">
        <div className="flex-1 p-4 overflow-y-auto">
          <MessageList messages={messages} />
          <TypingIndicator typingUsers={typingUsers} />
        </div>
        <div className="p-4 border-t">
          <ChatInput onSend={sendMessage} onTyping={setTyping} />
        </div>
      </main>
    </div>
  );
};

export default Chat;