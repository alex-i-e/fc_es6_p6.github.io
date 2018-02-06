module.exports = (router, logger, Blog) => {
    let news = require('./response.json');

    router.post('/blogs', (req, res) => {
        logger.log({
            level: 'info',
            message: 'API: POST => /blogs'
        });

        Blog.create(JSON.parse(JSON.stringify(req.body)), (err, data) => {
            res.json(req.body);
        });

    });
    router.get('/blogs', (req, res) => {
        logger.log({
            level: 'info',
            message: 'API: GET => /blogs'
        });

        Blog.find({}, (err, data) => {
            res.json({
                length: data ? data.length : 0,
                data: data
            });
        });
    });
    router.get('/blogs/:blogId', (req, res) => {
        logger.log({
            level: 'info',
            message: `API: GET => /blogs/${req.params.blogId}`
        });

        Blog.find({_id: req.params.blogId}, (err, data) => {
            res.json(data);
        });
    });
    router.put('/blogs/:blogId', (req, res) => {
        logger.log({
            level: 'info',
            message: `API: PUT => /blogs/${req.params.blogId}`
        });

        Blog.findByIdAndUpdate(req.params.blogId, JSON.parse(JSON.stringify(req.body)), (err, data) => {
            res.json(data ? data : {status: "object not found"});
        });
    });
    router.delete('/blogs/:blogId', (req, res) => {
        logger.log({
            level: 'info',
            message: `API: DELETE => /blogs/${req.params.blogId}`
        });

        Blog.findByIdAndRemove(req.params.blogId, (err, data) => {
            res.json({
                id: req.params.blogId,
                status: "deleted"
            });
        });
    });

    // OTHER mock routes
    // =============================================================================
    router.get('/mock', (req, res) => {
        logger.log({
            level: 'info',
            message: `API: GET => /mock`
        });
        res.json(news.mock);
    });
};