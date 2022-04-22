import express from "express";
import { check } from "express-validator";
import { getWeather } from "../controllers/weather-controller";
const router = express.Router();

router.post("/", getWeather);

export default router;
