const extractMeasure = (duration: number, period: number) => {
  const measure = Math.floor(duration / period);
  return [measure, duration - measure * period];
};

export const TimeConst = {
  DAY: 24 * 60 * 60 * 1000,
  HOUR: 60 * 60 * 1000,
  MINUTE: 60 * 1000,
  SECOND: 1000,
};

export const deconstructDuration = (duration: number) => {
  const [days, left1] = extractMeasure(duration, TimeConst.DAY);
  const [hours, left2] = extractMeasure(left1, TimeConst.HOUR);
  const [minutes, left3] = extractMeasure(left2, TimeConst.MINUTE);
  const [seconds, miliseconds] = extractMeasure(left3, TimeConst.SECOND);

  return [miliseconds, seconds, minutes, hours, days];
};

export const timeLeft = (target: number): [number, string] => {
  const now = +new Date();
  const dt = target - now;
  const [, , m, h, d] = deconstructDuration(Math.abs(dt));

  const result = [];
  d !== 0 && result.push(`${d} days, `);
  d !== h && d + h > 0 && result.push(`${h} hours and `);
  result.push(`${m} minutes`);

  return [dt, result.join('')];
};
