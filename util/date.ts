export const getNumDaysInCurrentMonth = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const lastDayOfMonth = new Date(year, month, 0);

  return lastDayOfMonth.getDate();
};

export const getNumDaysInCurrentYear = () => {
  const currentYear = new Date().getFullYear();
  if (
    currentYear % 4 === 0 &&
    (currentYear % 100 !== 0 || currentYear % 400 === 0)
  ) {
    return 366;
  } else {
    return 365;
  }
};

export const daysInYearToDate = () => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const timeDifference = now.getTime() - startOfYear.getTime();
  const daysElapsed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysElapsed + 1;
};

const getDateOfNthDayOfMonth = (
  year: number,
  month: number,
  day: number,
  nth: number,
) => {
  const date = new Date(year, month - 1, 1);
  while (date.getDay() !== day) {
    date.setDate(date.getDate() + 1);
  }
  date.setDate(date.getDate() + 7 * (nth - 1));
  return date;
};

const getThanksgivingDate = (year: number) => {
  return getDateOfNthDayOfMonth(year, 11, 4, 4);
};

const getMothersDayDate = (year: number) => {
  return getDateOfNthDayOfMonth(year, 5, 0, 2);
};

const getFathersDayDate = (year: number) => {
  return getDateOfNthDayOfMonth(year, 6, 0, 3);
};

const getEasterDate = (Y: number) => {
  const A = Y % 19;
  const B = Y % 4;
  const C = Y % 7;
  const P = Math.floor(Y / 100.0);

  const Q = Math.floor((13 + 8 * P) / 25.0);
  const M = Math.floor(15 - Q + P - Math.floor(P / 4)) % 30;
  const N = Math.floor(4 + P - Math.floor(P / 4)) % 7;
  const D = Math.floor(19 * A + M) % 30;
  const E = Math.floor(2 * B + 4 * C + 6 * D + N) % 7;

  const days = Math.floor(22 + D + E);

  if (D === 29 && E === 6) {
    return new Date(Y, 3, 19);
  } else if (D === 28 && E === 6) {
    return new Date(Y, 3, 18);
  } else {
    if (days > 31) {
      return new Date(Y, 3, days - 31);
    } else {
      return new Date(Y, 2, days);
    }
  }
};

const getDaysUntilNthDayOfMonth = (fn: (year: number) => Date) => {
  const now = new Date();
  const currentYear = now.getFullYear();

  const currentYearThanksgiving = fn(currentYear);
  const nextYearThanksgiving = fn(currentYear + 1);

  if (now.valueOf() - currentYearThanksgiving.valueOf() > 0) {
    return Math.floor(
      (nextYearThanksgiving.valueOf() - now.valueOf()) / 1000 / 60 / 60 / 24,
    );
  }

  return Math.floor(
    (currentYearThanksgiving.valueOf() - now.valueOf()) / 1000 / 60 / 60 / 24,
  );
};

export const getDaysUntilNextThanksgiving = () => {
  return getDaysUntilNthDayOfMonth(getThanksgivingDate);
};

export const getDaysUntilNextEaster = () => {
  return getDaysUntilNthDayOfMonth(getEasterDate);
};

export const getDaysUntilNextMothersDay = () => {
  return getDaysUntilNthDayOfMonth(getMothersDayDate);
};

export const getDaysUntilNextFathersDay = () => {
  return getDaysUntilNthDayOfMonth(getFathersDayDate);
};

export const getDaysUntilNextDate = (month: number, day: number) => {
  const now = new Date();
  const currentYear = now.getFullYear();

  const currentYearDate = new Date(currentYear, month - 1, day);
  const nextYearDate = new Date(currentYear + 1, month - 1, day);

  if (now.valueOf() - currentYearDate.valueOf() > 0) {
    return Math.floor(
      (nextYearDate.valueOf() - now.valueOf()) / 1000 / 60 / 60 / 24,
    );
  }

  return Math.floor(
    (currentYearDate.valueOf() - now.valueOf()) / 1000 / 60 / 60 / 24,
  );
};
