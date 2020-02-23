let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
  productId: String,
  producrName: String,
  productPrice: Number,
  productPic: String,
  date: {
    type: Date,
    default: Date.now
  },
  descriptioni: String,
  ProductOwner: String,
  categories: String
})

module.exports = mongoose.model('Product', productSchema)
