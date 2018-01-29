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
    res.render('index', {title: '[Welcome]', message: 'Hello there!'})
});

// OTHER mock routes
// =============================================================================
const topHeadlinesMock = {
    "status": "ok",
    "totalResults": 8,
    "articles": [{
        "source": {"id": "recode", "name": "Recode"},
        "author": "Eric Johnson",
        "title": "Social media has ‘peaked’ in politics, NBC’s Chuck Todd says",
        "description": "The moderator of “Meet the Press” thinks Twitter, Facebook and the like can’t surprise us anymore.",
        "url": "https://www.recode.net/2018/1/29/16943296/chuck-todd-nbc-meet-the-press-politics-washington-social-media-kara-swisher-recode-decode-podcast",
        "urlToImage": "https://cdn.vox-cdn.com/thumbor/_SeIhLsGW_GMWw__f904SPimNUA=/0x254:4872x2805/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/10112487/Chuck_Todd1.jpg",
        "publishedAt": "2018-01-29T11:30:02Z"
    }, {
        "source": {"id": "recode", "name": "Recode"},
        "author": "Recode Staff",
        "title": "Full transcript: JibJab co-founder and CEO Gregg Spiridellis on Recode Decode",
        "description": "“How do we empower people with our content, as well as tools, to be funny in their own lives? It’s not about being mass-funny. It’s about being micro-funny.”",
        "url": "https://www.recode.net/2018/1/28/16933436/transcript-jibjab-comedy-founder-gregg-spiridellis-funny-cartoon-video-greeting-card-recode-decode",
        "urlToImage": "https://cdn.vox-cdn.com/thumbor/qkQBeoUDN8tLvnndqfknnREK-O0=/0x120:975x630/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/10097667/jibjablogo.jpg",
        "publishedAt": "2018-01-28T15:00:01Z"
    }, {
        "source": {"id": "recode", "name": "Recode"},
        "author": "Recode Staff",
        "title": "Full transcript: Axios’ Ina Fried answer Spectre and Meltdown question on Too Embarrassed to Ask",
        "description": "Ina used to work for Recode, but we let her on the show anyway.",
        "url": "https://www.recode.net/2018/1/27/16938686/transcript-axios-ina-fried-answer-spectre-meltdown-chip-flaw-question-too-embarrassed-to-ask",
        "urlToImage": "https://cdn.vox-cdn.com/thumbor/Azb8PH6Md_ovW_3mz6upHTzZl9E=/0x0:1024x536/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/10105861/codemobile_20151007_140608_2743_XL.jpg",
        "publishedAt": "2018-01-27T09:00:02Z"
    }, {
        "source": {"id": "recode", "name": "Recode"},
        "author": "Recode Staff",
        "title": "Full transcript: NYU professor Jay Rosen, CNN’s Oliver Darcy and BuzzFeed’s Charlie Warzel on Recode Media",
        "description": "In a rare two-part podcast, we get a double dose of Trump in the media.",
        "url": "https://www.recode.net/2018/1/26/16937110/transcript-nyu-professor-jay-rosen-cnn-oliver-darcy-buzzfeed-charlie-warzel-trump-recode-media",
        "urlToImage": "https://cdn.vox-cdn.com/thumbor/Nj09v7Fb0Cbt24vY2iH8TaAd27g=/0x158:3600x2043/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/10104083/910573506.jpg.jpg",
        "publishedAt": "2018-01-26T18:36:26Z"
    }, {
        "source": {"id": "recode", "name": "Recode"},
        "author": "Rani Molla",
        "title": "How Bozoma Saint John plans to fix Uber’s brand problem",
        "description": "“Nobody is okay with this.”",
        "url": "https://www.recode.net/2017/9/14/16306484/uber-bozoma-saint-john-brand-sexual-harassment-lawsuit-trade-secret-apple-music",
        "urlToImage": "https://cdn0.vox-cdn.com/thumbor/RDdwlKxFglwJTgqkKN1lDZ_4ZnQ=/0x0:2880x1508/fit-in/1200x630/cdn2.vox-cdn.com/uploads/chorus_asset/file/9246605/REC_KMACDONALD_CODECOMMERCE17_20170914_114617_5838.jpg",
        "publishedAt": "2017-09-14T16:40:49Z"
    }, {
        "source": {"id": "recode", "name": "Recode"},
        "author": "Peter Kafka",
        "title": "The head of the NBA wants his games to look more like Twitch",
        "description": "Pro sports on TV looks the same way it looked 30 years ago, Adam Silver says. He thinks the internet can change that.",
        "url": "https://www.recode.net/2017/9/13/16304278/nba-twitch-adam-silver-tv-ratings-facebook-amazon",
        "urlToImage": "https://cdn0.vox-cdn.com/thumbor/zGiDlyVV3H235s1OlhqmFR43FdQ=/0x0:2880x1508/fit-in/1200x630/cdn2.vox-cdn.com/uploads/chorus_asset/file/9240307/NBA_Commissioner_Adam_Silver_Code_Commerce.jpg",
        "publishedAt": "2017-09-13T20:21:24Z"
    }, {
        "source": {"id": "recode", "name": "Recode"},
        "author": "Rani Molla",
        "title": "A startup investor with billion dollar exits on how retail must change",
        "description": "Kirsten Green, founder of Forerunner Ventures, breaks down the retail landscape.",
        "url": "https://www.recode.net/2017/9/13/16296366/code-commerce-forerunner-ventures-kirsten-green-retail",
        "urlToImage": "https://cdn0.vox-cdn.com/thumbor/Tqd7I0Or4YFlECaLHS_sc35HbYw=/0x0:2880x1508/fit-in/1200x630/cdn1.vox-cdn.com/uploads/chorus_asset/file/9239097/REC_KMACDONALD_CODECOMMERCE17_20170913_114051_3455.jpg",
        "publishedAt": "2017-09-13T15:36:30Z"
    }, {
        "source": {"id": "recode", "name": "Recode"},
        "author": "Johana Bhuiyan",
        "title": "Williams-Sonoma CEO Laura Alber: ‘I do not believe Amazon is killing retailers’",
        "description": "“I think retailers’ bad service is killing retailers,” Alber said.",
        "url": "https://www.recode.net/2017/9/13/16300822/williams-sonoma-ceo-laura-alber-amazon-retail-ar-vr-pottery-barn-mall-delivery-amazon",
        "urlToImage": "https://cdn0.vox-cdn.com/thumbor/k1Gm9bO9rltEqpLC4T41349JnAQ=/269x61:1280x590/fit-in/1200x630/cdn1.vox-cdn.com/uploads/chorus_asset/file/9237269/REC_KMACDONALD_CODECOMMERCE17_20170913_092029_0402.jpg",
        "publishedAt": "2017-09-13T14:08:14Z"
    }]
};
app.get('/mock', (req, res) => {
    res.json(topHeadlinesMock);

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