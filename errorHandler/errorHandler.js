module.exports = (logger) => ({
    e400: (err, req, res, next) => {

        if (err.status === 400) {
            res.json({
                status: err.status,
                err: err
            });
        }

        next(err);
    },
    e404: (req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    },
    e500: (err, req, res, next) => {
        logger.log({
            level: 'error',
            message: `WRONG API or router: ${req.url || req.originalUrl}`
        });
        res.status(err.status || 500);
        res.render('error', {
            title: '[Error]',
            message: `${err.message}, wrong API or router: ${req.url || req.originalUrl}`
        })
    }
});