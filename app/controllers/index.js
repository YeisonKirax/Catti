'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');


exports.render = function(req, res) {
    res.render('index', {
        user: JSON.stringify(req.user)
    });
};
