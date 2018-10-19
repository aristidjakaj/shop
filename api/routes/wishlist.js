const express = require (`express`);
const router = express.Router();
const checkAuth = require(`../middleware/check-auth`);

const WishlistController = require(`../controllers/wishlist`);

router.get(`/`, checkAuth, WishlistController.wishlist_get_all);

router.post(`/`, checkAuth, WishlistController.wishlist_create_wish);

router.get(`/:wishId`, checkAuth, WishlistController.wishlist_get_wish);

router.delete(`/:wishId`, checkAuth, WishlistController.wishlist_delete_wish);

module.exports = router;
