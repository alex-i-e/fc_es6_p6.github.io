const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const winston = require('winston');
const format = winston.format;
const router = express.Router();

// Logger
// =====================================================
const myFormat = format.printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.label({label: 'LOG'}),
        format.timestamp(),
        myFormat
    ),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.File({filename: 'combined.log'}),
        new winston.transports.Console()
    ]
});


//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

// Config
// =====================================================

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
const blogs = require('./app/routes');
blogs(router, logger);
app.use('/api', router);


// Template Engine
// =============================================================================
app.set('view engine', 'pug');
app.set('views', './views');
app.get('/', (req, res) => {
    logger.log({
        level: 'info',
        message: `INIT: Starting index page!`
    });
    res.render('index', {title: '[Welcome]', message: 'Hello there!'})
});

// Error handling
// =============================================================================
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

// Init
///////////////////////////
app.listen(port);