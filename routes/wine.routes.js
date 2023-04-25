const express = require("express");
const router = express.Router();
const Wine = require("../models/Wine.model");

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
  const { image_url, wine, winery, about, origin, rating } = req.body;

  Wine.create({ image_url, wine, winery, about, origin, rating })
    .then((createdWine) => {
      console.log(createdWine);
      res.redirect(`/wine/wines/${createdWine._id}`);
    })
    .catch((err) => next(err));
});

module.exports = router;
