const passport = require('passport');



exports.log_in = passport.authenticate('local');

exports.log_out = (req, res, next) => {
    req.logout(function(err) {
        if (err) return next(err);
    });
};

// exports.user_login_post = passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/forum/log-in'
// });

// exports.user_log_out = (req, res, next) => {
//     req.logout(function(err) {
//         if (err) return next(err);
//         res.redirect('/');
//     });
// }