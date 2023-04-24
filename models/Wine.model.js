const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const wineSchema = new Schema({
    winery: String,
    wine: String,
    type: {
        enum: ["sparkling","red", "white", "rose", "port", "dessert"]
    },
    about: String, 
    origin: String,
    image: String,
    rating: Number,
})

const Wine = mongoose.model("Wine", wineSchema);
module.exports = Wine;