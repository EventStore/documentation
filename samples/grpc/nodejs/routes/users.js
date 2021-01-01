import express from "express";

const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  // Set a response type of plain text for the response
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Send back a response and end the connection
  res.end("Hello World!\n");
});

export default router;
