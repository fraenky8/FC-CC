module.exports = function (req, res, next)
{
    res.json({
        'error': '404 Not Found',
        'method': req.method,
        'path': req.path
    })
};
