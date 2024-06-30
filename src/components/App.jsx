import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

const FrequencyList = ({ frequencies, onReserve, onRelease }) => (
  <ul>
    {frequencies.map(freq => (
      <li key={freq.id}>
        {freq.frequency} - {freq.status}
        {freq.status === 'free' ? (
          <button onClick={() => onReserve(freq.id)}>Reserve</button>
        ) : (
          <button onClick={() => onRelease(freq.id)}>Release</button>
        )}
      </li>
    ))}
  </ul>
);

export const App = () => {
  const [frequencies, setFrequencies] = useState([]);

  useEffect(() => {
    socket.on('frequencies', (data) => {
      setFrequencies(data);
    });

    return () => {
      socket.off('frequencies');
    };
  }, []);

  const handleReserve = (frequencyId) => {
    const userId = 1; // Замінити на реальний ID користувача
    socket.emit('reserve', { frequencyId, userId });
  };

  const handleRelease = (frequencyId) => {
    const userId = 1; // Замінити на реальний ID користувача
    socket.emit('release', { frequencyId, userId });
  };

  return (
    <div>
      <h1>Frequency List</h1>
      <FrequencyList
        frequencies={frequencies}
        onReserve={handleReserve}
        onRelease={handleRelease}
      />
    </div>
  );
};

export default App;
