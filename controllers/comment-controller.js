const Comment = require('../models/comment');

const async = require('async');
const {body, validationResult} = require('express-validator');

exports.get_comments = (req, res, next) => {
    Comment.find().populate('user').populate('post').exec((err, comments) => {
        if (err) return next(err);
        res.json({comments});
    });
};

exports.post_comment = [
    body('username').trim().isLength({min: 8, max: 25}).escape(),
    body('post').trim().isLength({min: 1}).escape(),
    body('timestamp').isISO8601().toDate(),
    body('text').trim().isLength({min: 1, max: 5000}).escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        const comment = new Comment({
            username: req.body.username,
            post: req.body.post,
            timestamp: req.body.timestamp,
            text: req.body.text
        });

        if (!errors.isEmpty()) {
            res.json({
                comment,
                errors: errors.array()
            });
            return;
        }

        comment.save((err) => {
            if (err) return next(err);
            res.json({comment});
        });
    }
];

exports.get_comment = (req, res, next) => {
    Comment.findById(req.params.commentId).populate('post').exec((err, comment) => {
        if (err) return next(err);
        res.json({comment});
    });
};

exports.delete_comment = (req, res, next) => {
    Comment.findByIdAndRemove(req.params.commentId, (err) => {
        if (err) return next(err);
    });
};