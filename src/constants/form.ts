export const API_URL = 'https://67ffc1b0b72e9cfaf725ce80.mockapi.io/api/v1/tasks';

export const DEFAULT_REPEATING_DATE = {
  mo: false,
  tu: false,
  we: false,
  th: false,
  fr: false,
  sa: false,
  su: false,
};

export const DEFAULT_PAGE_SIZE = 8;

export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
};

export const WEEK_IN_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;
export const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
