const express = require("express");
const path = require("path");
const fs = require("fs");
const logger = require("morgan");
const app = express();
const port = 3000;

app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/promotionWebtoonList", function(req, res) {
  const promotionWebtoonList = fs.readFileSync("./public/data/promotionWebtoonList.json", "utf-8");
  res.send(promotionWebtoonList);
});

app.get("/weeklyWebtoonList", function(req, res) {
  const weeklyWebtoonList = fs.readFileSync("./public/data/weeklyWebtoonList.json", "utf-8");
  res.send(weeklyWebtoonList);
});

app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Example app listening on port ${port}`);
});
