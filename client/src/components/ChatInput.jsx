import { useState } from 'react';

const ChatInput = ({ onSend, onTyping }) => {
  const [input, setInput] = useState('');
  let typingTimeout;

  const handleChange = (e) => {
    setInput(e.target.value);
    onTyping(true);
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => onTyping(false), 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
      onTyping(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="flex-1 border rounded px-3 py-2"
        value={input}
        onChange={handleChange}
        placeholder="Type a message..."
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;