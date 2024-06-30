export const FrequencyList = ({ frequencies, onReserve, onRelease, userId }) => {
    console.log(userId);
    return (
        <ul>
          {frequencies.map(freq => (
            <li key={freq.id}>
              {freq.frequency} - Brand-{freq.brand} - CHANNEL-{freq.ch}: {freq.status}
              {freq.status === 'free' ? (
                <button onClick={() => onReserve(freq.id)}>Reserve</button>
              ) : (
                freq.userId === userId && <button onClick={() => onRelease(freq.id)}>Release</button>
              )}
            </li>
          ))}
        </ul>
      )
};
  