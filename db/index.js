// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");
console.log(10);

const Wine = require("../models/Wine.model");
const data = require("../wine");
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/wine_collection";

console.log(11);
mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const databaseName = x.connection.name;
    console.log(`Connected to Mongo! Database name: "${databaseName}"`);

    // "ordered: false" mongo skip duplicate documents
    const options = {
      ordered: false,
    };
    Wine.insertMany(data, options)
      .then((createdWines) => console.log(createdWines))
      .catch((err) => console.log(err));
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
