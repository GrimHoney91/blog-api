const Post = require('../models/post');

const async = require('async');
const {body, validationResult} = require('express-validator');

exports.get_posts = (req, res, next) => {
    Post.find().populate('user').exec((err, posts) => {
        if (err) return next(err);
        res.json({posts});
    });
};

exports.post_post =  [
    body('title').trim().isLength({min: 1, max: 80}).escape(),
    body('user').trim().isLength({min: 1}).escape(),
    body('timestamp').isISO8601().toDate(),
    body('text').trim().isLength({min: 1, max: 30000}).escape(),
    body('status').trim().isLength({min: 1}).escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        const post = new Post({
            title: req.body.title,
            user: req.body.user,
            timestamp: req.body.timestamp,
            text: req.body.text,
            status: req.body.status
        });

        if (!errors.isEmpty()) {
            res.json({
                post,
                errors: errors.array()
            });
            return;
        }

        post.save((err) => {
            if (err) return next(err);
            res.json({post});
        });
    }
];

exports.get_post = (req, res, next) => {
    Post.findById(req.params.postId).populate('user').exec((err, post) => {
        if (err) return next(err);
        res.json({post});
    });
};

exports.put_post = [
    body('title').trim().isLength({min: 1, max: 80}).escape(),
    body('user').trim().isLength({min: 1}).escape(),
    body('timestamp').isISO8601().toDate(),
    body('text').trim().isLength({min: 1, max: 30000}).escape(),
    body('status').trim().isLength({min: 1}).escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        const post = new Post({
            title: req.body.title,
            user: req.body.user,
            timestamp: req.body.timestamp,
            text: req.body.text,
            status: req.body.status,
            _id: req.params.postId
        });

        if (!errors.isEmpty()) {
            res.json({
                post,
                errors: errors.array()
            });
            return;
        }

        Post.findByIdAndUpdate(req.params.postId, post, {}, (err) => {
            if (err) return next(err);
            res.json({post});
        });
    }
];

exports.delete_post = (req, res, next) => {
    Post.findByIdAndRemove(req.params.postId, (err) => {
        if (err) return next(err);
    });
};