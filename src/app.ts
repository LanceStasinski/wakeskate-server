import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import express, { Request, Response, NextFunction } from "express";

import HttpError from "./models/http-error";
import geocodeRoute from "./routes/geocode-route";
import weatherRoute from "./routes/weather-route";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/geocode", geocodeRoute);
app.use("/api/weather", weatherRoute);

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  res
    .status(err.code || 500)
    .json({ message: err.message || "An unknown error occurred." });
});

app.listen(PORT || 3000, () => console.log("App running on port 3000"));
