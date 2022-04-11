import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import express, { Request, Response, NextFunction } from "express";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(3000, () => console.log("App running on port 3000"));
