import { useState } from "react";

const HomePage = ({ onContinue }) => {
  const [selected, setSelected] = useState("student");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm mb-4">
        ✨ Intervue Poll
      </span>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
        Welcome to the Live Polling System
      </h1>
      <p className="text-gray-500 text-center mb-8 max-w-md">
        Please select the role that best describes you to begin using the live polling system
      </p>

      <div className="flex gap-4 mb-6 flex-col md:flex-row">
        <div
          onClick={() => setSelected("student")}
          className={`cursor-pointer border rounded-xl p-6 w-64 transition ${
            selected === "student" ? "border-purple-500 shadow-md" : "border-gray-300"
          }`}
        >
          <h2 className="font-semibold text-lg mb-2">I’m a Student</h2>
          <p className="text-sm text-gray-500">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>

        <div
          onClick={() => setSelected("teacher")}
          className={`cursor-pointer border rounded-xl p-6 w-64 transition ${
            selected === "teacher" ? "border-purple-500 shadow-md" : "border-gray-300"
          }`}
        >
          <h2 className="font-semibold text-lg mb-2">I’m a Teacher</h2>
          <p className="text-sm text-gray-500">
            Submit answers and view live poll results in real-time.
          </p>
        </div>
      </div>

      <button
        onClick={() => onContinue(selected)}
        className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
      >
        Continue
      </button>
    </div>
  );
};

export default HomePage;
