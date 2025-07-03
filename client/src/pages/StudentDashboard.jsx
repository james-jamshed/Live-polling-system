import { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import ChatPopup from '../components/ChatPopup';

export default function StudentDashboard() {
  const socket = useSocket();

  // ✅ Load name from sessionStorage if available
  const [name, setName] = useState(() => sessionStorage.getItem('studentName') || '');
  const [entered, setEntered] = useState(() => !!sessionStorage.getItem('studentName'));

  const [poll, setPoll] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    socket.on('new_poll', (q) => {
      setPoll(q);
      setResults(null);
    });

    socket.on('poll_results', setResults);

    socket.on('kick_student', (targetName) => {
      if (targetName === name) {
        alert('You have been removed by the teacher.');
        sessionStorage.removeItem('studentName'); // clear name on kick
        window.location.href = '/';
      }
    });

    return () => {
      socket.off('new_poll');
      socket.off('poll_results');
      socket.off('kick_student');
    };
  }, [socket, name]);

  const handleEnter = () => {
    if (name.trim()) {
      sessionStorage.setItem('studentName', name); // ✅ store name
      setEntered(true);
    }
  };

  const submit = (selectedAnswer) => {
    socket.emit('submit_answer', { name, answer: selectedAnswer });
  };

  if (!entered) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-4 py-2 rounded"
        />
        <button onClick={handleEnter} className="bg-green-600 text-white px-4 py-2 rounded">
          Join Poll
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Welcome, {name}</h2>

      {poll && !results && (
        <div className="space-y-2">
          <p className="font-semibold mb-2">{poll.question}</p>
          {poll.options.map((opt, i) => (
            <button
              key={i}
              className="border px-3 py-2 rounded mb-2 block w-full"
              onClick={() => submit(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {results && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Results:</h3>
          <div className="space-y-1">
            {Object.entries(results).map(([ans, count]) => (
              <div key={ans}>{ans}: {count}</div>
            ))}
          </div>
        </div>
      )}

      <ChatPopup />
    </div>
  );
}
