const router = require('express').Router();
const Controller = require('../controllers/controller')

router.get('/books', Controller.readBooks)
router.get('/wishlist', Controller.readWishlists)
router.post('/wishlist/:bookId', Controller.createWishlist)
router.delete('/wishlist/:wishId', Controller.deleteWishlist)

module.exports = router