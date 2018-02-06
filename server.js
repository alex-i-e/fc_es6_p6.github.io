const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const config = require('./config/config.json');
const port = process.env.PORT || config.port || 3000;
const Blog = require('./models/blog').Blog;
const logger = require('./logger/logger');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const blogs = require('./app/routes');
blogs(router, logger, Blog);
app.use('/api', router);

app.set('view engine', 'pug');
app.set('views', './views');
app.get('/', (req, res) => {
    logger.log({
        level: 'info',
        message: `INIT: Starting index page!`
    });
    res.render('index', {title: '[Welcome]', message: 'Hello there!'})
});

app.use(function (err, req, res, next) {

    if (err.status === 400) {
        res.json({
            status: err.status,
            err: err
        });
    }

    next(err);
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    logger.log({
        level: 'error',
        message: `WRONG API or router: ${req.url || req.originalUrl}`
    });
    res.status(err.status || 500);
    res.render('error', {
        title: '[Error]',
        message: `${err.message}, wrong API or router: ${req.url || req.originalUrl}`
    })
});

app.listen(port);