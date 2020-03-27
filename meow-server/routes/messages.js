var express = require('express');
var router = express.Router();

const messages = [];

/* GET home page. */
router.get('/', function(req, res, next) {
    const from = req.query.from || 0;
    res.send(messages.slice(from));
});

router.post('/', function(req, res, next) {
    const message = req.body.text;
    messages.push(message);
    res.send({
        length: messages.length
    });
});

module.exports = router;