const errorHandler = (err, req, res, next) => {
    let status = 500
    let message = "Internal Server Error"

    if (err.message == "NotFound") {
        status = 404
        message = "Book not found"
    }

    if (err.name == 'SequelizeUniqueConstraintError') {
        status = 400
        message = "Book already in the wishlist"
    }

    res.status(status).json({
        message
    })
}

module.exports = errorHandler