import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-3xl font-bold">Live Poll System</h1>

      <button
        onClick={() => navigate('/teacher')}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        I'm a Teacher
      </button>

      <button
        onClick={() => {
          sessionStorage.removeItem('studentName'); // ✅ Clear name before entering
          navigate('/student');
        }}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        I'm a Student
      </button>
    </div>
  );
}
