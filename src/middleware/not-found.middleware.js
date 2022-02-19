const notFoundMiddleware = (req, res, next) => {
    res.status(404).send({ statusCode: 404, statusMessage: 'Not Found', message: null, data: null });
};

module.exports = notFoundMiddleware;
