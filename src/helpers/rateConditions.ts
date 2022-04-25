const ACCEPTABLE_WEATHER = ["Clear", "Clouds", "Mist", "Smoke", "Haze", "Dust"];

export default function rateConditions(
  temp: number,
  windSpeed: number,
  weather: string,
  dayOfYear: number
) {
  let conditionRating;
  if (
    (dayOfYear < 135 || dayOfYear > 244) &&
    temp > 50 &&
    ACCEPTABLE_WEATHER.includes(weather) &&
    windSpeed < 10
  ) {
    conditionRating = 420;
  } else if (
    dayOfYear >= 135 &&
    dayOfYear <= 244 &&
    ACCEPTABLE_WEATHER.includes(weather)
  ) {
    const windRating = rateWind(windSpeed, 1.25);
    const tempRating = rateTemp(temp, 1);
    const weatherRating = rateWeather(weather, 0.5);
    conditionRating = windRating + tempRating + weatherRating;
  } else {
    conditionRating = 0;
  }
  const score =
    conditionRating === 420
      ? "wetsuit"
      : conditionRating >= 10.5
      ? "perfect"
      : conditionRating >= 7.75 && conditionRating < 10.5
      ? "good"
      : conditionRating >= 5.5 && conditionRating < 7.75
      ? "okay"
      : "bad";
  return score;
}

function rateWind(windSpeed: number, multiplier: number) {
  let rating =
    windSpeed < 5
      ? 4
      : windSpeed >= 5 && windSpeed < 9
      ? 3
      : windSpeed >= 9 && windSpeed < 12
      ? 2
      : 1;
  return rating * multiplier;
}

function rateTemp(temp: number, multiplier: number) {
  let rating =
    temp >= 80
      ? 4
      : temp >= 70 && temp < 80
      ? 3
      : temp >= 60 && temp < 70
      ? 2
      : 1;
  return rating * multiplier;
}

function rateWeather(weather: string, multiplier: number) {
  let rating =
    weather === "Clear" ? 3 : ACCEPTABLE_WEATHER.includes(weather) ? 2 : 1;
  return rating * multiplier;
}

rateConditions(80, 4, "Clear", 200);
