module.exports = function globalErrorHandler(err, req, res, next) {
    const defaultError = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: {err: 'An error occurred'},
    }
    const errObj = Object.assign({}, defaultError, err);
    console.log(errObj.log);
    return res.status(errObj.status).json(errObj.message);
};

// return res.status(400).json('Something went wrong!');