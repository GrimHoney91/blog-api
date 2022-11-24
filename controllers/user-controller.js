const User = require('../models/user');

const async = require('async');
const {body, validationResult} = require('express-validator');

exports.get_users = (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) return next(err);

        res.json({users});
    });
};

exports.post_user = [
    body('username').trim().isLength({min: 8, max: 25}).escape(),
    body('password').trim().isLength({min: 8, max: 25}).escape(),
    body('confirmPassword').trim().isLength({min: 8, max: 25}).escape().custom((value, {req}) => value === req.body.password),
    body('status').trim().isLength({min: 1}).escape().custom((value) => value === 'member'),

    (req, res, next) => {
        const errors = validationResult(req);

        let user = {
            username: req.body.username,
            password: req.body.password,
            status: req.body.status
        };

        if (!errors.isEmpty()) {
            res.json({
                user,
                errors: errors.array()
            });
            return;
        }

        bcrypt.hash(user.password, 10, (err, hashedPassword) => {
            if (err) return next(err);

            user.password = hashedPassword;

            const newUser = new User(user);

            newUser.save((err) => {
                if (err) return next(err);
                res.json({newUser});
            });
        });


    }
];

exports.get_user = (req, res, next) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) return next(err);

        res.json({user});
    });
};

exports.delete_user = (req, res, next) => {
    User.findByIdAndRemove(req.params.userId, (err) => {
        if (err) return next(err);
    });
};