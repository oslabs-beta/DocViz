module.exports = function requestLogger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next(); // Pass control to the next middleware/handler
};
