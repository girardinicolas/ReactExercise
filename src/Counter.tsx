import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Aggiorna il titolo del documento ogni volta che count cambia
    document.title = `Click: ${count}`;
  }, [count]); // dipendenza su count

  return (
    <div>
      <p>Hai cliccato {count} volte</p>
      <button onClick={() => setCount(count + 1)}>
        Clicca qui
      </button>
    </div>
  );
}

export default Counter;
