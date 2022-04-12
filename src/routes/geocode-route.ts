import express from "express";
import { check } from "express-validator";
import { geocode } from "../controllers/geocode-controller";

const router = express.Router();

router.post("/", [check("location").not().isEmpty()], geocode);

export default router;
