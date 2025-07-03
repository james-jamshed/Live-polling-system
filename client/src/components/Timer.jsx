import { useEffect, useState } from 'react';

export default function Timer({ duration, onTimeout }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeout();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimeout]);

  return (
    <div className="text-sm text-gray-600 mt-2">
      Time left: {timeLeft}s
    </div>
  );
}
