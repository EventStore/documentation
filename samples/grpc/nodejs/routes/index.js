import express from "express";
import getStarted from "../samples/getStarted";

const router = express.Router();

getStarted(router);

module.exports = router;
