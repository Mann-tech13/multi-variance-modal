const express = require("express");
const cors = require("cors");
const {ObjectId} = require("mongodb");
const mongoose = require("mongoose");
const Variance = require("./models/variance");

require("dotenv").config();

const app = express();
app.use(cors());

mongoose
  .connect(
    `mongodb+srv://claserken:${process.env.MONGO_PASS}@conflate.0ez6ufo.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB");
    console.log("MongoDB connected");

    app.listen(5000, () => console.log("Server listening to port 5000!"));
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/get-variance/:id", async(req, res) => {
  try {
    const id = req.params.id;
    const selectedVariances = await Variance.findOne({_id: id}); 
    res.status(200).send({code: selectedVariances});

  } catch (error) {
    console.error("Error saving data to MongoDB:", error);
    res.status(500).send("Internal Server Error");
  }
})

app.get("/change-color.js", async (req, res) => {
  const variance_blue = `document.body.style.backgroundColor = '#4287f5';`;
  const variance_purple = `document.body.style.backgroundColor = '#7b42f5';`;
  const variance_green = `document.body.style.backgroundColor = '#42f5b0';`;
  const variance_pink = `document.body.style.backgroundColor = '#f542b6';`;
  const variance_orange = `document.body.style.backgroundColor = '#f57242';`;
  const variance_red = `document.body.style.backgroundColor = '#f54242';`;
  const variance = [
    variance_orange,
    variance_red,
    variance_blue,
    variance_green,
    variance_pink,
    variance_orange,
    variance_red,
    variance_purple,
  ];
  try {
    const documents = variance.map((code) => ({
      javascriptCode: code,
    }));
    await Variance.insertMany(documents);

    res.status(200).send("Code snippets saved successfully");
  } catch (error) {
    console.error("Error saving data to MongoDB:", error);
    res.status(500).send("Internal Server Error");
  }
});
