import { WeatherData } from "../models/weatherData";

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
  type: "current" | "hourly" | "daily",
) {
  const { dt, temp, feels_like, wind_speed, wind_deg, wind_gust, weather } =
    inputData;
  const { main, description, icon } = weather[0];
  const { month, day, dayOfWeek, hourTime } = getDateInfo(dt);

  const date = { month, day_of_week: dayOfWeek, day, hour: hourTime };

  const temperature =
    type === "daily"
      ? { actual: temp.max, feels_like: null }
      : { actual: temp, feels_like };

  const wind =
    type === "hourly"
      ? { wind_speed, wind_deg, wind_gust }
      : { wind_speed, wind_deg, wind_gust: null };

  const weatherInfo = { main, description, icon };

  return { date, temperature, wind, weatherInfo };
}

function getDateInfo(utcDate: number) {
  const date = new Date(utcDate * 1000);
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  const dayOfWeek = DAYS[date.getDay()];
  const hourTime = date.getHours();
  return { month, day, dayOfWeek, hourTime };
}
