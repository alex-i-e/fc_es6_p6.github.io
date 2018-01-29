module.exports = (router, logger) => {
    let news = require('./response.json');

    router.post('/blogs', (req, res) => {
        logger.log({
            level: 'info',
            message: 'API: POST => /blogs'
        });
        res.send(news.post);
    });
    router.get('/blogs', (req, res) => {
        logger.log({
            level: 'info',
            message: 'API: GET => /blogs'
        });
        res.json(news.get);
    });
    router.get('/blogs/:blogId', (req, res) => {
        logger.log({
            level: 'info',
            message: `API: GET => /blogs/${req.params.blogId}`
        });
        res.json({
            response: `a GET request for LOOKING at a special blog id: ${req.params.blogId}`
        });
    });
    router.put('/blogs/:blogId', (req, res) => {
        logger.log({
            level: 'info',
            message: `API: PUT => /blogs/${req.params.blogId}`
        });
        res.json(news.put_id);
    });
    router.delete('/blogs/:blogId', (req, res) => {
        logger.log({
            level: 'info',
            message: `API: DELETE => /blogs/${req.params.blogId}`
        });
        res.json(news.delete_id);
    });
};