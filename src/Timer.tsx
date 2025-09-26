import { useState, useEffect, useRef } from 'react';

function Timer() {
  const [count, setCount] = useState(0);
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  const handleStop = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
  };

  return (
    <div>
      <p>Timer: {count} secondi</p>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
}

export default Timer;
