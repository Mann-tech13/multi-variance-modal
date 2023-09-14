// import express from 'express';
// import cors from 'cors';

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.listen(5000, () => console.log("Server listening to port 5000!"));

app.get("/change-color.js", (req, res) => {
  const changeColor = `document.body.style.backgroundColor = 'red';`;
  res.setHeader('Content-Type', 'application/javascript');
  res.send(changeColor);
});
