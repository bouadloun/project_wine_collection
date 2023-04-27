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

//Get a specific wine type
router.get("/red-wines", (req, res, next) => {
  // Get all wines from db
  Wine.find({ type: "red" })
    .then((winesFromDB) => {
      console.log(winesFromDB);
      res.render("wine/wines", { wines: winesFromDB });
    })
    .catch((err) => next(err));
});

router.get("/white-wines", (req, res, next) => {
  // Get all wines from db
  Wine.find({ type: "white" })
    .then((winesFromDB) => {
      console.log(winesFromDB);
      res.render("wine/wines", { wines: winesFromDB });
    })
    .catch((err) => next(err));
});

router.get("/rose-wines", (req, res, next) => {
  // Get all wines from db
  Wine.find({ type: "rose" })
    .then((winesFromDB) => {
      console.log(winesFromDB);
      res.render("wine/wines", { wines: winesFromDB });
    })
    .catch((err) => next(err));
});

router.get("/sparkling-wines", (req, res, next) => {
  // Get all wines from db
  Wine.find({ type: "sparkling" })
    .then((winesFromDB) => {
      console.log(winesFromDB);
      res.render("wine/wines", { wines: winesFromDB });
    })
    .catch((err) => next(err));
});

router.get("/port-wines", (req, res, next) => {
  // Get all wines from db
  Wine.find({ type: "port" })
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

//GET SINGLE WINE
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

// GIVE THE URL TO A SINGLE WINE
router.get("/wines/:winename", (req, res) => {
  const winename = req.params.winename;
  console.log(winename);

  Wine.findOne({ wine: winename }).then((wineFromDB) => {
    res.render("wine/single-wine", { singleWine: wineFromDB });
  });
});

router.post("/wines/:wineId/reviews", (req, res) => {
  const { username, review } = req.body;
  const wineId = req.params.wineId;

  Wine.findByIdAndUpdate(wineId, {
    $push: { reviews: { username, review } },
  }).then(() => {
    res.redirect(`/wines/${wineId}`);
  });
});

module.exports = router;
