import { useEffect, useState } from 'react';

function format(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function useCountdown(targetTimestamp: number) {
  const [remaining, setRemaining] = useState(() => targetTimestamp - Date.now());

  useEffect(() => {
    const tick = () => setRemaining(targetTimestamp - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetTimestamp]);

  return format(remaining);
}
