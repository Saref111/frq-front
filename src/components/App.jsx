import { getId } from 'helpers/getId';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import { FrequencyList } from './FrequenciesList';

const socket = io('https://frq-back.onrender.com');

export const App = () => {
  const [frequencies, setFrequencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = getId();

  useEffect(() => {
    setIsLoading(true);
    socket.on('frequencies', (data) => {
      setFrequencies(data);
      setIsLoading(false);
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
      {isLoading && <p>Loading, please wait...</p>}
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
