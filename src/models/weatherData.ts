interface WeatherInfo {
  date: {
    month: string;
    day_of_week: string;
    day: number | string;
    hour: number | string;
  };
  temp: {
    actual: number;
    feels_like: number | null;
  };
  wind: {
    wind_deg: number;
    wind_speed: number;
    wind_gust: number | null;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  };
}

export interface WeatherData {
  current: WeatherInfo;
  hourly: [WeatherInfo];
  daily: [WeatherInfo];
}