// === FILE: client/src/pages/StudentDashboard.jsx ===
import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import ChatPopup from "../components/ChatPopup";

export default function StudentDashboard() {
  const socket = useSocket();
  const [name, setName] = useState("");
  const [entered, setEntered] = useState(false);
  const [poll, setPoll] = useState(null);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const storedName = sessionStorage.getItem("studentName");
    if (storedName) {
      setName(storedName);
      setEntered(true);
      socket.emit("student_join", storedName);
    }
  }, [socket]);

  useEffect(() => {
    socket.on("new_poll", (data) => {
      setPoll(data);
      setSelected(null);
      setSubmitted(false);
      setResults(null);
      setTimer(data.time);
    });

    socket.on("poll_results", (res) => {
      setResults(res);
    });

    socket.on("kick_student", (targetName) => {
      if (targetName === name) {
        alert("You have been removed by the teacher.");
        sessionStorage.removeItem("studentName");
        window.location.href = "/";
      }
    });

    return () => {
      socket.off("new_poll");
      socket.off("poll_results");
      socket.off("kick_student");
    };
  }, [socket, name]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleEnter = () => {
    if (name.trim()) {
      sessionStorage.setItem("studentName", name);
      socket.emit("student_join", name);
      setEntered(true);
    }
  };

  const handleSubmit = () => {
    if (!submitted && selected) {
      socket.emit("submit_answer", { name, answer: selected });
      setSubmitted(true);
    }
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
        <button
          onClick={handleEnter}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Join Poll
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-xl">
        <div className="relative h-screen">
          <h2 className="text-xl font-bold mb-4 absolute top-4 left-4">
            Welcome, {name}
          </h2>
          <h2 className="text-xl font-bold text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Wait for the teacher to ask question...
          </h2>
        </div>
        {poll && !results && (
          <div className="bg-white p-4 rounded border shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Question</h2>
              <span className="text-red-600 font-mono">🕒 {timer}s</span>
            </div>
            <div className="bg-gray-800 text-white rounded-t px-4 py-2 font-semibold">
              {poll.question}
            </div>
            <div className="border border-purple-200 rounded-b p-4 space-y-3">
              {poll.options.map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelected(opt)}
                  className={`flex items-center space-x-3 px-4 py-2 rounded border cursor-pointer ${
                    selected === opt
                      ? "border-purple-500 bg-purple-100"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      selected === opt
                        ? "bg-purple-600 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span>{opt}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSubmit}
                disabled={!selected || submitted}
                className="bg-purple-600 text-white px-6 py-2 rounded disabled:opacity-50"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {results && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Results:</h3>
            {Object.entries(results).map(([ans, count]) => (
              <div key={ans} className="mb-2">
                <div className="text-sm font-medium mb-1">{ans}</div>
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

        <ChatPopup />
      </div>
    </div>
  );
}
