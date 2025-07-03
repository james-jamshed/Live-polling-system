import { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import ChatPopup from '../components/ChatPopup';

export default function TeacherDashboard() {
  const socket = useSocket();

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [timer, setTimer] = useState(60);
  const [results, setResults] = useState(null);
  const [activePoll, setActivePoll] = useState(null); // ✅ new state

  useEffect(() => {
    socket.on('poll_results', (res) => {
      setResults(res);
      setActivePoll(null); // ✅ clear question when results arrive
    });

    return () => socket.off('poll_results');
  }, [socket]);

  const sendPoll = () => {
    if (!question.trim() || options.length < 2 || options.some(opt => !opt.trim())) {
      alert('Please enter a question and at least two options');
      return;
    }

    const pollData = {
      question,
      options,
      time: timer,
    };

    socket.emit('create_poll', pollData);

    setActivePoll(pollData); // ✅ store current poll
    setResults(null); // ✅ clear old results
    setQuestion('');
    setOptions(['', '']);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4">Teacher Panel</h2>

        {/* Poll input form */}
        <input
          placeholder="Enter question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border px-2 py-1 mt-2 w-full"
        />
        {options.map((opt, idx) => (
          <input
            key={idx}
            value={opt}
            placeholder={`Option ${idx + 1}`}
            onChange={(e) => {
              const updated = [...options];
              updated[idx] = e.target.value;
              setOptions(updated);
            }}
            className="border px-2 py-1 mt-2 w-full"
          />
        ))}
        <button
          onClick={() => setOptions([...options, ''])}
          className="mt-2 text-blue-600 underline text-sm"
        >
          + Add Option
        </button>
        <div className="flex items-center mt-4 space-x-2">
          <input
            type="number"
            min={10}
            value={timer}
            onChange={(e) => setTimer(Number(e.target.value))}
            className="border px-2 py-1 w-20"
          />
          <button
            onClick={sendPoll}
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Send Poll
          </button>
        </div>

        {/* Active Poll */}
        {activePoll && (
          <div className="mt-6">
            <h3 className="font-semibold">Poll Sent:</h3>
            <p className="italic">{activePoll.question}</p>
            <ul className="list-disc ml-5 mt-1 text-sm text-gray-700">
              {activePoll.options.map((opt, i) => (
                <li key={i}>{opt}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="mt-6">
            <h3 className="font-semibold">Results:</h3>
            {Object.entries(results).map(([ans, count]) => (
              <div key={ans}>{ans}: {count}</div>
            ))}
          </div>
        )}

        <ChatPopup />
      </div>
    </div>
  );
}
