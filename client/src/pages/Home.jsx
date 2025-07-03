import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('student');

  const handleContinue = () => {
    if (selectedRole === 'student') {
      sessionStorage.removeItem('studentName');
      navigate('/student');
    } else if (selectedRole === 'teacher') {
      navigate('/teacher');
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="mb-8 flex items-center space-x-2">
        <span className="inline-block bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
          Intervue Poll
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
        Welcome to the <span className="font-bold">Live Polling System</span>
      </h1>
      <p className="text-gray-500 text-center max-w-md mb-10 sm:max-w-lg">
        Please select the role that best describes you to begin using the live polling system
      </p>

      <div className="flex flex-col sm:flex-row gap-6 max-w-3xl w-full justify-center">
        
        <button
          type="button"
          onClick={() => setSelectedRole('student')}
          className={`w-full sm:w-64 p-6 rounded border-2 text-left focus:outline-none transition-shadow
            ${
              selectedRole === 'student'
                ? 'border-blue-600 shadow-lg'
                : 'border-gray-200 hover:shadow-md'
            }`}
        >
          <h3 className="text-lg font-semibold mb-2">
            I&apos;m a Student
          </h3>
          <p className="text-gray-600 text-sm leading-snug">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry
          </p>
        </button>

        {/* Teacher Card */}
        <button
          type="button"
          onClick={() => setSelectedRole('teacher')}
          className={`w-full sm:w-64 p-6 rounded border-2 text-left focus:outline-none transition-shadow
            ${
              selectedRole === 'teacher'
                ? 'border-blue-600 shadow-lg'
                : 'border-gray-200 hover:shadow-md'
            }`}
        >
          <h3 className="text-lg font-semibold mb-2">
            I&apos;m a Teacher
          </h3>
          <p className="text-gray-600 text-sm leading-snug">
            Submit answers and view live poll results in real-time.
          </p>
        </button>
      </div>

      <button
        onClick={handleContinue}
        className="mt-10 bg-purple-600 text-white px-10 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition-colors"
      >
        Continue
      </button>
    </div>
  );
}

