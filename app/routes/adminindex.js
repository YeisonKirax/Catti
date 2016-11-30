'use strict';

module.exports = function(app) {
// Home route
var index = require('../../app/controllers/admin');
app.get('/admindex', index.render);
};

