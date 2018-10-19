const Wishlist = require(`../models/wishlist`);
const mongoose = require(`mongoose`);

exports.wishlist_get_all = (req, res, next) => {
  Wishlist.find({}).select(`product _id`).populate(`product`, `name`).then(docs => {
    res.status(200).json({
      count: docs.length,
      wish: docs.map(doc => {
        return {
          _id: doc._id,
          product: doc.product
          request: {
            type: `GET`,
            url: `http://localhost:3000/wishlist/${doc._id}`
          }
        }
      })
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
}

exports.wishlist_create_wish = (req, res, next) => {
  Product.findById(req.body.productId).then(product =>{
    if(!product) {
      return res.status(404).json({
        message: `Product not found`
      });
    }
    const wishlist = new Wishlist({
      _id: mongoose.Types.ObjectId(),
      product: req.body.productId
    });
    return wishlist.save()
  }).then(result => {
    console.log(result);
    res.status(201).json({
      message: `Wish stored`,
      request: {
        type: `POST`,
        createdWish: {
          _id: result._id,
          product: result.product
        },
        url: `http://localhost:3000/wishlist/${result._id}`
      }
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}

exports.wishlist_get_wish = (req, res, next) => {
  Wishlist.findById(req.params.wishId).populate(`product`).then(order => {
    if (!order) {
      return res.status(404).json({
        message: `Wish not found`
      });
    }
    res.status(200).json({
      wish: wish,
      request: {
        type: `GET`,
        url: `http://localhost:3000/wishlist`
      }
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
}

exports.wishlist_delete_wish = (req, res, next) => {
  Wishlist.remove({ _id: req.params.wishId }).then(result => {
    res.status(200).json({
      message: `Wish deleted`,
      request: {
        type: `DELETE`,
        url: `http://localhost:3000/wishlist`,
        body: {
          productId: `ID`
        }
      }
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
}
