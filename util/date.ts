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
    return 366; // Leap year
  } else {
    return 365; // Regular year
  }
};

export const daysInYearToDate = () => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const timeDifference = now.getTime() - startOfYear.getTime();
  const daysElapsed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysElapsed + 1; // Adding 1 because the current day is inclusive
};

// month is 1 indexed, 0 = Sunday
// getDateOfNthDayOfMonth(2023, 11, 4, 4) is the fourth Monday of November
const getDateOfNthDayOfMonth = (
  year: number,
  month: number,
  day: number,
  nth: number,
) => {
  // Find the first Thursday in November and add 3 weeks to it
  let date = new Date(year, month - 1, 1);
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
  let A, B, C, P, Q, M, N, D, E;

  // All calculations done
  // on the basis of
  // Gauss Easter Algorithm
  A = Y % 19;
  B = Y % 4;
  C = Y % 7;
  P = Math.floor(Y / 100.0);

  Q = Math.floor((13 + 8 * P) / 25.0);
  M = Math.floor(15 - Q + P - Math.floor(P / 4)) % 30;
  N = Math.floor(4 + P - Math.floor(P / 4)) % 7;
  D = Math.floor(19 * A + M) % 30;
  E = Math.floor(2 * B + 4 * C + 6 * D + N) % 7;

  let days = Math.floor(22 + D + E);

  // A corner case,
  // when D is 29
  if (D == 29 && E == 6) {
    return new Date(Y, 3, 19);
  }
  // Another corner case,
  // when D is 28
  else if (D == 28 && E == 6) {
    return new Date(Y, 3, 18);
  } else {
    // If days > 31, move to April
    // April = 4th Month
    if (days > 31) {
      return new Date(Y, 3, days - 31);
    } else {
      // Otherwise, stay on March
      // March = 3rd Month
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
    // If we are past the current year's Thanksgiving, the next holiday must be next year
    return Math.floor(
      (nextYearThanksgiving.valueOf() - now.valueOf()) / 1000 / 60 / 60 / 24,
    );
  }

  // The next Thanksgiving is this year
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

export const getDaysUntilNextDate = (
  month: number /* Month is 1 indexed */,
  day: number,
) => {
  const now = new Date();
  const currentYear = now.getFullYear();

  const currentYearDate = new Date(currentYear, month - 1, day);
  const nextYearDate = new Date(currentYear + 1, month - 1, day);

  if (now.valueOf() - currentYearDate.valueOf() > 0) {
    // If we are past the current year's Thanksgiving, the next holiday must be next year
    return Math.floor(
      (nextYearDate.valueOf() - now.valueOf()) / 1000 / 60 / 60 / 24,
    );
  }

  // The next Thanksgiving is this year
  return Math.floor(
    (currentYearDate.valueOf() - now.valueOf()) / 1000 / 60 / 60 / 24,
  );
};
