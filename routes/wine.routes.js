const express = require("express");
const router = express.Router();
const Wine = require("../models/Wine.model");
const MongoStore = require("connect-mongo");
/* GET wine page */

router.get("/wines", (req, res, next) => {
  // Get all wines from db
  Wine.find()
    .then((winesFromDB) => {
      console.log(winesFromDB);
      res.render("wine/wines", { wines: winesFromDB });
    })
    .catch((err) => next(err));
});

router.post("/wine/wines", (req, res, next) => {
  console.log(req.body);
  const { image, wine, winery, about, origin, rating } = req.body;

  Wine.create({ image, wine, winery, about, origin, rating })
    .then((createdWine) => {
      console.log(createdWine);
      res.redirect(`/wine/wines/${createdWine._id}`);
    })
    .catch((err) => next(err));
});

router.get("/single-wine", (req, res) => {
  Wine.find()
    .then((responseFromDB) => {
      let number = responseFromDB.length;
      let wineIndex = Math.floor(Math.random() * number);
      console.log("THIS IS THE WINE INDEX", wineIndex);

      console.log("Single wine from the database: ", responseFromDB[wineIndex]);
      res.render("wine/single-wine", { singleWine: responseFromDB[wineIndex] });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
