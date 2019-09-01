const getWeekday = date => new Intl.DateTimeFormat(['en-US'], {
  weekday: 'long',
}).format(new Date(date));

const getDateTimeStr = date => new Intl.DateTimeFormat(['en-US'], {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
}).format(new Date(date));

const getHour = date => new Intl.DateTimeFormat(['en-US'], {
  hour: '2-digit',
}).format(new Date(date));

const getHourMin = date => new Intl.DateTimeFormat(['en-US'], {
  hour: '2-digit',
  minute: '2-digit',
}).format(new Date(date));

export {
  getWeekday,
  getDateTimeStr,
  getHour,
  getHourMin,
};
