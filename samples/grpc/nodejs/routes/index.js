import express from "express";
import getStarted from "../samples/getStarted.js";

const router = express.Router();

getStarted(router);

export default router;
