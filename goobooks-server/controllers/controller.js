const axios = require('axios')
const { Wishlist } = require('../models')

class Controller {
    static async readBooks(req, res, next) {
        try {
            let { q } = req.query

            if (!q) {
                q = "harry"
            }

            const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}`)

            if (!data.items) throw new Error("NotFound")

            const books = data.items.map((book) => {
                return {
                    id: book.id,
                    title: book.volumeInfo.title,
                    preview: book.volumeInfo.imageLinks?.thumbnail ? book.volumeInfo.imageLinks.thumbnail : 'no preview',
                    author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'unknown',
                    rating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 0
                }
            })

            res.status(200).json(books)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async readWishlists(req, res, next) {
        try {
            const wishlists = await Wishlist.findAll()
            res.status(200).json(wishlists)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async createWishlist(req, res, next) {
        try {
            const { bookId } = req.params
            const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookId}`)

            if (!data.items) throw new Error("NotFound")

            await Wishlist.create({
                title: data.items[0].volumeInfo.title,
                preview: data.items[0].volumeInfo.imageLinks?.thumbnail ? data.items[0].volumeInfo.imageLinks.thumbnail : 'no preview',
                author: data.items[0].volumeInfo.authors ? data.items[0].volumeInfo.authors[0] : 'unknown',
                rating: data.items[0].volumeInfo.averageRating ? data.items[0].volumeInfo.averageRating : 0,
                bookId: data.items[0].id
            })

            res.status(201).json({
                message: "Added to wishlist"
            })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async deleteWishlist(req, res, next) {
        try {
            const { wishId } = req.params
            const wishlist = await Wishlist.findByPk(wishId)

            if (!wishlist) throw new Error("NotFound")

            await Wishlist.destroy({
                where: {
                    id: wishId
                }
            })

            res.status(200).json({
                message: "Book removed from wishlist"
            })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = Controller