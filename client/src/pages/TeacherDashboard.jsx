// === FILE: client/src/pages/TeacherDashboard.jsx ===

import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import ChatPopup from '../components/ChatPopup';

export default function TeacherDashboard() {
  const socket = useSocket();

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']); // ✅ added missing options state
  const [correct, setCorrect] = useState([false, false]);
  const [timer, setTimer] = useState(60);
  const [results, setResults] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    socket.on('poll_results', setResults);
    socket.on('update_participants', setParticipants);

    return () => {
      socket.off('poll_results');
      socket.off('update_participants');
    };
  }, [socket]);

  const sendPoll = () => {
    const trimmedOptions = options.map((o) => o.trim()).filter(Boolean);
    if (!question.trim() || trimmedOptions.length < 2) {
      alert('Please enter a question and at least two options.');
      return;
    }

    const correctMap = trimmedOptions.map((_, i) => correct[i] || false);

    socket.emit('create_poll', {
      question,
      options: trimmedOptions,
      correct: correctMap,
      time: timer,
    });

    setQuestion('');
    setOptions(['', '']);
    setCorrect([false, false]);
    setResults(null);
  };

  const updateOption = (val, i) => {
    const copy = [...options];
    copy[i] = val;
    setOptions(copy);
  };

  const updateCorrect = (val, i) => {
    const copy = [...correct];
    copy[i] = val;
    setCorrect(copy);
  };

  const addOption = () => {
    setOptions([...options, '']);
    setCorrect([...correct, false]);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h2 className="text-lg font-semibold">🧪 Interview Poll</h2>
      <h1 className="text-3xl font-bold">Let's <span className="text-purple-600">Get Started</span></h1>
      <p className="text-gray-600">
        You’ll have the ability to create and manage polls, ask questions, and monitor your students’ responses in real-time.
      </p>

      <div className="flex items-center space-x-4">
        <input
          className="border w-full px-4 py-2"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={100}
        />
        <select
          value={timer}
          onChange={(e) => setTimer(Number(e.target.value))}
          className="border px-2 py-2"
        >
          {[30, 60, 90].map((sec) => (
            <option key={sec} value={sec}>{sec} seconds</option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {options.map((opt, i) => (
          <div key={i} className="flex items-center space-x-4">
            <input
              className="border px-4 py-2 flex-1"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => updateOption(e.target.value, i)}
            />
            <div className="flex items-center space-x-2">
              <label className="text-sm">Is it Correct?</label>
              <input
                type="radio"
                name={`correct-${i}`}
                checked={correct[i] === true}
                onChange={() => updateCorrect(true, i)}
              /> Yes
              <input
                type="radio"
                name={`correct-${i}`}
                checked={correct[i] === false}
                onChange={() => updateCorrect(false, i)}
              /> No
            </div>
          </div>
        ))}
        <button onClick={addOption} className="text-purple-600">+ Add More option</button>
      </div>

      <button
        onClick={sendPoll}
        className="bg-purple-600 text-white px-6 py-2 rounded float-right"
      >
        Ask Question
      </button>

      {results && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Live Results:</h3>
          {Object.entries(results).map(([opt, count]) => (
            <div key={opt} className="mb-2">
              <div className="text-sm font-medium mb-1">{opt}</div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="bg-purple-500 h-full text-xs text-white text-center"
                  style={{ width: `${count}%` }}
                >
                  {count}%
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ChatPopup
        participants={participants}
        onKick={(name) => socket.emit('kick_student', name)}
      />
    </div>
  );
}
