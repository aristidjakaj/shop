const mongoose = require(`mongoose`);

const wishlistSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: { type: mongoose.Schema.Types.ObjectId, ref: `Product`, required: true }
});

module.exports = mongoose.model(`Wishlist`, wishlistSchema);
