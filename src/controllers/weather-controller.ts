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
    const weatherData = <WeatherData>{};
    destructureWeather(data.current, weatherData, "current");
    for (let hour = 1; hour < 9; hour++) {
      destructureWeather(data.hourly[hour], weatherData, "hourly", hour);
    }
    for (let day = 1; day < 7; day++) {
      destructureWeather(data.daily[day], weatherData, "daily", day);
    }

    weatherData;

    res.status(200).send({ message: "ok" });
  } catch (error) {
    const err = new HttpError("Weather request denied", 500);
    next(err);
    console.log(error);
  }
};
