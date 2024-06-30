import { getId } from 'helpers/getId';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import { FrequencyList } from './FrequenciesList';

const socket = io('https://frq-back.onrender.com:8080');

export const App = () => {
  const [frequencies, setFrequencies] = useState([]);
  const userId = getId();

  useEffect(() => {
    socket.on('frequencies', (data) => {
      setFrequencies(data);
    });

    return () => {
      socket.off('frequencies');
    };
  }, []);

  const handleReserve = (frequencyId) => {
    socket.emit('reserve', { frequencyId, userId });
  };

  const handleRelease = (frequencyId) => {
    socket.emit('release', { frequencyId, userId });
  };

  return (
    <div>
      <h1>Frequency List</h1>
      <FrequencyList
        frequencies={frequencies}
        onReserve={handleReserve}
        onRelease={handleRelease}
        userId={userId}
      />
    </div>
  );
};

export default App;
