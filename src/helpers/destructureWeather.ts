import rateConditions from "./rateConditions";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function destructureWeather(
  inputData: any,
  type: "current" | "hourly" | "daily"
) {
  const { dt, temp, feels_like, wind_speed, wind_deg, wind_gust, weather } =
    inputData;
  const { main, description, icon } = weather[0];
  const {
    month,
    day,
    dayOfWeek,
    hourTime,
    dayOfYear,
    datetime,
    time,
    minutes,
  } = getDateInfo(dt);

  const date = {
    month,
    day_of_week: dayOfWeek,
    day,
    hour: hourTime,
    datetime,
    time,
    minutes,
  };

  const temperature =
    type === "daily"
      ? { actual: temp.max, feels_like: null }
      : { actual: temp, feels_like };

  const wind =
    type === "hourly"
      ? { wind_speed, wind_deg, wind_gust }
      : { wind_speed, wind_deg, wind_gust: null };

  const weatherInfo = { main, description, icon };

  const rating = rateConditions(temperature.actual, wind_speed, main, dayOfYear);

  return { date, temperature, wind, weatherInfo, rating };
}

function getDateInfo(utcDate: number) {
  const date = new Date(utcDate * 1000);
  const month = MONTHS[date.getMonth()];
  const dateTimeMonth =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth()}`;
  const day = date.getDate();
  const dayOfWeek = DAYS[date.getDay()];
  const hourTime = date.getHours();
  const hourMilitary =
    date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;

  const dayOfYear =
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
    24 /
    60 /
    60 /
    1000;
  const time = `${hourTime}:${minutes}`;
  const datetime = `${date.getFullYear()}-${
    dateTimeMonth
  }-${date.getDate()} ${hourMilitary}:${minutes}`;
  return {
    month,
    day,
    dayOfWeek,
    hourTime,
    dayOfYear,
    datetime,
    time,
    minutes,
  };
}
