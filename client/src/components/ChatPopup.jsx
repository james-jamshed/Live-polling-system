import { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { useDispatch, useSelector } from 'react-redux';
import { addChat } from '../slices/pollSlice';

export default function ChatPopup() {
  const [msg, setMsg] = useState('');
  const socket = useSocket();
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.poll.chat);

  useEffect(() => {
    socket.on('chat_message', (message) => {
      dispatch(addChat(message));
    });

    return () => {
      socket.off('chat_message');
    };
  }, [socket]);

  const sendMessage = () => {
    if (msg.trim()) {
      socket.emit('chat_message', msg);
      setMsg('');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 shadow-md rounded-lg w-64 h-80 flex flex-col">
      <h4 className="font-bold mb-2">Chat</h4>
      <div className="flex-1 overflow-y-auto text-sm mb-2">
        {chat.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>
      <div className="flex">
        <input
          className="border rounded w-full px-2 py-1"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="ml-2 text-blue-600" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
