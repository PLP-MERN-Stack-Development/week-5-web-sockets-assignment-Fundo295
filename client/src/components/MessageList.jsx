const MessageList = ({ messages }) => {
  return (
    <ul className="space-y-2">
      {messages.map((msg) => (
        <li key={msg.id} className={msg.system ? 'text-gray-500 italic' : ''}>
          {msg.system ? (
            <span>{msg.message}</span>
          ) : (
            <div>
              <span className="font-semibold">{msg.sender}:</span> {msg.message}
              <div className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleTimeString()}</div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
