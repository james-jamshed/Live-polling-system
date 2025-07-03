export default function PollCard({ question, answer, setAnswer, onSubmit }) {
  return (
    <div className="bg-white shadow-md p-4 rounded w-full max-w-md">
      <p className="text-lg font-semibold mb-2">{question}</p>
      <input
        type="text"
        placeholder="Your answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-3"
      />
      <button onClick={onSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Answer
      </button>
    </div>
  );
}
