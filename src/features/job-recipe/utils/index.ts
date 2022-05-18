import momentTz from "moment-timezone";

export const getTimeFromNow = (dateString: string) => {
  const localeUTC = momentTz.tz(
    dateString,
    "DD/MM/YYYY HH:mm:ss",
    "Asia/Jerusalem"
  );

  const date = new Date(localeUTC.format());

  const now = new Date();

  const diff = Math.abs(+now - +date); //in miliseconds
  const seconds = Math.floor(diff / 1000);
  const mins = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / (60 * 60));
  const days = Math.floor(seconds / (60 * 60 * 24));
  const months = Math.floor(seconds / (60 * 60 * 24 * 30.5));
  return { months, days, hours, mins, seconds };
};
