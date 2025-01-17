module.exports = function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log the error stack
    res.status(500).send('Something went wrong!'); // Send a 500 response
};
