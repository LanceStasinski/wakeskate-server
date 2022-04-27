import { HttpError } from "./../models/http-error";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
import axios from "axios";

dotenv.config();
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const geocode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Please search for a location.", 422));
  }

  try {
    const { location } = req.body;

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        location
      )}&key=${GOOGLE_API_KEY}`
    );

    const data: any = response.data;

    if (!data || data.status === "Zero_RESULTS") {
      const error = new HttpError(
        "Could not find location for specified address",
        422
      );
      next(error);
    }

    const { lat, lng } = data.results[0].geometry.location;

    res.status(200).send({ lat, lng });
  } catch (error) {
    const err = new HttpError(
      "Could not connect to Google API",
      422
    );
    next(err);
  }
};
