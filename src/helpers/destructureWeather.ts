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
  weatherObject: WeatherData,
  type: "current" | "hourly" | "daily",
  index?: number
) {
  const { dt, temp, feels_like, wind_speed, wind_deg, wind_gust, weather } =
    inputData;

  const { month, day, dayOfWeek, hourTime } = getDateInfo(dt);

  const { main, description, icon } = weather[0];
  if (type === "current") {
    console.log(dt);
    weatherObject.current.date = {
      month,
      day_of_week: dayOfWeek,
      day,
      hour: hourTime,
    };
    weatherObject.current.temp = { actual: temp, feels_like };
    weatherObject.current.wind = { wind_speed, wind_deg, wind_gust };
    weatherObject.current.weather = { main, description, icon };
  } else if (type === "hourly") {
    const hour = weatherObject.hourly[index!];
    hour.date = {
      month,
      day_of_week: dayOfWeek,
      day,
      hour: hourTime,
    };
    hour.temp = { actual: temp, feels_like };
    hour.wind = { wind_speed, wind_deg, wind_gust };
    hour.weather = { main, description, icon };
  } else {
    const daily = weatherObject.daily[index!];
    daily.date = {
      month,
      day_of_week: dayOfWeek,
      day,
      hour: hourTime,
    };
    daily.temp = { actual: temp.max, feels_like: null };
    daily.wind = { wind_speed, wind_deg, wind_gust: null };
    daily.weather = { main, description, icon };
  }
}

function getDateInfo(utcDate: number) {
  const date = new Date(utcDate * 1000);
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  const dayOfWeek = DAYS[date.getDay()];
  const hourTime = date.getHours();
  return { month, day, dayOfWeek, hourTime };
}
