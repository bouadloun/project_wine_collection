const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wineSchema = new Schema({
  winery: String,
  wine: { type: String, unique: true },
  type: {
    type: String,
    enum: ["sparkling", "red", "white", "rose"],
  },
  about: String,
  origin: String,
  image: String,
  rating: Number,

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Wine = mongoose.model("Wine", wineSchema);
module.exports = Wine;
