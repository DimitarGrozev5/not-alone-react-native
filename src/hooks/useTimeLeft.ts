import { useEffect, useState } from 'react';
import { jsUTCTimestamp } from '../models/helpers';
import { timeLeft } from '../util/time';

export const useTimeLeft = (targetTime: jsUTCTimestamp) => {
  const [left, setLeft] = useState<[number, string]>([0, '']);

  useEffect(() => {
    let latestRequest: number;
    const update = () => {
      const [dt, text] = timeLeft(targetTime);
      setLeft([dt, text]);
      latestRequest = requestAnimationFrame(update);
    };
    if (targetTime) {
      update();
    }
    return () => cancelAnimationFrame(latestRequest);
  }, [targetTime]);

  return left;
};
