import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
import axios from "axios";

import destructureWeather from "../helpers/destructureWeather";
import { WeatherData } from "./../models/weatherData";
import { HttpError } from "./../models/http-error";

dotenv.config();
const WEATHER_MAP_KEY = process.env.WEATHER_MAP_KEY;

export const getWeather = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { lat, lng } = req.body;
  try {
    const response = await axios(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=alerts,minutely&units=imperial&appid=${WEATHER_MAP_KEY}`
    );
    const data = response.data;

    const weatherData = <WeatherData>{
      current: {},
      hourly: new Array(8),
      daily: new Array(6),
    };

    weatherData.current = destructureWeather(data.current, "current");

    for (let hour = 1; hour < 9; hour++) {
      weatherData.hourly[hour - 1] = destructureWeather(
        data.hourly[hour],
        "hourly"
      );
    }

    for (let day = 1; day < 7; day++) {
      weatherData.daily[day - 1] = destructureWeather(data.daily[day], "daily");
    }

    res.status(200).send(weatherData);
  } catch (error) {
    const err = new HttpError("Weather request denied", 500);
    next(err);
    console.log(error);
  }
};
