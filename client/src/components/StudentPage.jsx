import { useState } from "react";

const studentName = ({ onSubmit }) => {
  const [name, setName] = useState("");

  const handleContinue = () => {
    if (name.trim()) {
      sessionStorage.setItem("studentName", name);
      onSubmit(name);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm mb-4">
        ✨ Intervue Poll
      </span>
      <h1 className="text-3xl font-semibold mb-2">
        Let’s <span className="text-purple-600 font-bold">Get Started</span>
      </h1>
      <p className="text-center text-gray-500 max-w-md mb-8">
        If you're a student, you'll be able to <strong>submit your answers</strong>, participate in live polls, and see how your responses compare with your classmates
      </p>

      <input
        type="text"
        placeholder="Enter your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border w-full max-w-md rounded-md px-4 py-2 mb-6 outline-none focus:ring-2 focus:ring-purple-500"
      />

      <button
        onClick={handleContinue}
        className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
      >
        Continue
      </button>
    </div>
  );
};

export default studentName;
