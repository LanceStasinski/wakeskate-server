interface WeatherInfo {
  date: {
    time: string;
    datetime: string;
    month: string;
    day_of_week: string;
    day: number | string;
    hour: number | string;
    minutes: number | string;
  };
  temperature: {
    actual: number;
    feels_like: number | null;
  };
  wind: {
    wind_deg: number;
    wind_speed: number;
    wind_gust: number | null;
  };
  weatherInfo: {
    main: string;
    description: string;
    icon: string;
  };
  rating: string;
}

export interface WeatherData {
  current: WeatherInfo;
  hourly: WeatherInfo[];
  daily: WeatherInfo[];
}
