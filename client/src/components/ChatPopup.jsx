import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

export default function ChatPopup({ participants = [], onKick }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socket = useSocket();
  const name = sessionStorage.getItem('studentName') || 'Teacher';

  useEffect(() => {
    socket.on('chat_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off('chat_message');
  }, [socket]);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('chat_message', { sender: name, text: input });
      setInput('');
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-3 rounded-full shadow-lg"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 bg-white border rounded shadow-lg w-80">
          <div className="flex border-b">
            <button
              onClick={() => setTab('chat')}
              className={`flex-1 px-4 py-2 text-sm font-semibold ${tab === 'chat' ? 'border-b-2 border-purple-600' : ''}`}
            >
              Chat
            </button>
            <button
              onClick={() => setTab('participants')}
              className={`flex-1 px-4 py-2 text-sm font-semibold ${tab === 'participants' ? 'border-b-2 border-purple-600' : ''}`}
            >
              Participants
            </button>
          </div>

          {tab === 'chat' && (
            <div className="flex flex-col h-64">
              <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded max-w-[70%] ${
                      msg.sender === name ? 'bg-purple-100 ml-auto text-right' : 'bg-gray-100'
                    }`}
                  >
                    <strong>{msg.sender}</strong><br />
                    {msg.text}
                  </div>
                ))}
              </div>
              <div className="flex border-t">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 px-3 py-2 text-sm outline-none"
                  placeholder="Type a message..."
                />
                <button
                  onClick={sendMessage}
                  className="bg-purple-600 text-white px-4 text-sm"
                >
                  Send
                </button>
              </div>
            </div>
          )}

          {tab === 'participants' && (
            <div className="p-3 text-sm space-y-2 h-64 overflow-y-auto">
              {participants.map((p, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span>{p}</span>
                  {name === 'Teacher' && (
                    <button onClick={() => onKick(p)} className="text-blue-600 text-xs">Kick out</button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
