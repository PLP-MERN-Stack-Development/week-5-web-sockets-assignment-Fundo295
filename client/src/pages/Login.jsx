import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../context/UserContext';

const Login = () => {
  const [input, setInput] = useState('');
  const { setUsername } = useUser();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setUsername(input.trim());
      navigate('/chat');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Enter Username</h1>
        <input
          className="w-full border p-2 rounded mb-4"
          type="text"
          placeholder="Your name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Join Chat
        </button>
      </form>
    </div>
  );
};

export default Login;
