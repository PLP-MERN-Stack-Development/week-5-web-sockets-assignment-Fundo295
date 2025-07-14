import { useState } from 'react';
import { Picker } from 'emoji-mart';


const ChatInput = ({ onSend, onTyping }) => {
  const [input, setInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  let typingTimeout;

  const handleChange = (e) => {
    setInput(e.target.value);
    onTyping(true);
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => onTyping(false), 1000);
  };

  const handleEmojiSelect = (emoji) => {
    setInput((prev) => prev + emoji.native);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
      onTyping(false);
      setShowEmojiPicker(false);
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="flex gap-2 items-center p-2 bg-white shadow rounded">
        {/* Emoji Toggle Button */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="text-xl"
        >
          😊
        </button>

        {/* Emoji Picker Panel */}
        {showEmojiPicker && (
          <div className="absolute bottom-12 left-0 z-50">
            <Picker onSelect={handleEmojiSelect} theme="light" />
          </div>
        )}

        {/* Chat Input */}
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
    </div>
  );
};

export default ChatInput;
