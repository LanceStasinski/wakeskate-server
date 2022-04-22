import { WeatherData } from "../models/weatherData";

export default function destructureWeather(
  inputData: any,
  weatherObject: WeatherData,
  type: "current" | "hourly" | "daily",
  index?: number
) {
  const { dt, temp, feels_like, wind_speed, wind_deg, wind_gust, weather } =
    inputData;
  const { main, description, icon } = weather[0];
  if (type === "current") {
    // control date
    weatherObject.current.dt = new Date(dt * 1000);
    weatherObject.current.temp = { actual: temp, feels_like };
    weatherObject.current.wind = { wind_speed, wind_deg, wind_gust };
    weatherObject.current.weather = { main, description, icon };
  } else if (type === "hourly") {
    const hour = weatherObject.hourly[index!];
    hour.dt = new Date(dt * 1000);
    hour.temp = { actual: temp, feels_like };
    hour.wind = { wind_speed, wind_deg, wind_gust };
    hour.weather = { main, description, icon };
  } else {
    const day = weatherObject.daily[index!];
    day.dt = dt;
    day.temp = { actual: temp.max, feels_like: null };
    day.wind = { wind_speed, wind_deg, wind_gust: null };
    day.weather = { main, description, icon };
  }
}
